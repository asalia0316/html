import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Map, Shield, Backpack, ChevronRight, AlertTriangle, Cpu, Activity,Scan } from 'lucide-react';

// --- 游戏数据与逻辑定义 (保持不变) ---

type RoomId = 'cryo_chamber' | 'corridor_main' | 'medical_bay' | 'control_room' | 'escape_pod';

interface Room {
  id: RoomId;
  name: string;
  description: (gameState: GameState) => string;
  exits: Partial<Record<'north' | 'south' | 'east' | 'west', RoomId>>;
  items: string[];
  interactables?: Record<string, string>;
  locked?: boolean;
  requiredItem?: string;
}

interface GameState {
  currentRoom: RoomId;
  inventory: string[];
  history: { type: 'info' | 'error' | 'success' | 'narrative'; text: string }[];
  flags: Record<string, boolean>;
  gameOver: boolean;
  victory: boolean;
}

const INITIAL_STATE: GameState = {
  currentRoom: 'cryo_chamber',
  inventory: [],
  history: [
    { type: 'info', text: '系统引导程序序列启动...' },
    { type: 'info', text: '生物识别扫描: 未知。生命体征: 临界值。' },
    { type: 'narrative', text: '...' },
    { type: 'narrative', text: '你在一阵剧烈的头痛中猛然惊醒。冰冷的冷冻气体刺痛着你的肺部。刺耳的警报声在远处回荡，红色的应急灯光在墙壁上跳动。' },
    { type: 'narrative', text: '你现在位于 [冷冻休眠舱]。这里冷得刺骨，看起来只有你一个人醒了。' }
  ],
  flags: {
    cryo_door_locked: true,
  },
  gameOver: false,
  victory: false,
};

// 房间地图配置 (保持不变)
const WORLD_MAP: Record<RoomId, Room> = {
  cryo_chamber: {
    id: 'cryo_chamber',
    name: '冷冻休眠舱 C-7',
    description: (state) => 
      state.flags.cryo_door_locked 
        ? "这是一间冰冷的圆形房间，排列着几十个像棺材一样的休眠舱。唯一的出口是北面的一扇厚重的防爆金属门，控制面板火花四溅，看起来完全卡死了。也许需要某种硬物才能强行撬开它。" 
        : "这是一间冰冷的圆形房间。北面的防爆门已经被撬开了一道缝隙，露出了外面黑暗、闪烁着红光的走廊。",
    exits: { north: 'corridor_main' },
    items: ['生锈的工业撬棍'],
    interactables: {
      '休眠舱': '其他休眠舱都显示着不详的红色故障灯。玻璃罩内是一片模糊的冰霜。',
      '金属门': '电子锁核心已经熔毁了。你需要物理手段打开它。'
    },
    locked: false
  },
  corridor_main: {
    id: 'corridor_main',
    name: '主甲板走廊',
    description: () => "这里是飞船的主干道。应急灯光忽明忽暗，把影子拉得长长的。墙壁和地板上溅满了某种已经干涸的不明绿色粘液。空气中弥漫着臭氧和烧焦电路的味道。\n西面通向控制室，东面是医疗湾，北面的尽头是逃生舱停泊口。",
    exits: { south: 'cryo_chamber', west: 'control_room', east: 'medical_bay', north: 'escape_pod' },
    items: [],
    locked: true,
    requiredItem: '生锈的工业撬棍'
  },
  control_room: {
    id: 'control_room',
    name: '中央控制室',
    description: () => "巨大的环形控制台大屏幕上反复闪烁着红色的警告字样：'警告：外星生物收容失效 - 级别 5'。指挥官的尸体倒在主控椅上，他的宇航服被某种锋利的东西撕碎了，手里紧紧攥着什么东西。",
    exits: { east: 'corridor_main' },
    items: ['A级红色门禁卡'],
    interactables: {
      '尸体': '那是安德森船长。他的胸口有一个巨大的伤口。最好别看得太仔细。',
      '屏幕': '航行日志的最后一条记录显示飞船在三天前捕获了一个未知生物样本用于研究。看来是个致命的错误。'
    },
    locked: false
  },
  medical_bay: {
    id: 'medical_bay',
    name: '医疗湾',
    description: () => "医疗室里一片狼藉，仿佛经历过一场搏斗。手术台被掀翻，各种仪器碎片散落一地。你在角落里一个半开的急救箱里发现了一些还能用的补给。",
    exits: { west: 'corridor_main' },
    items: ['肾上腺素注射器'],
    interactables: {
      '手术台': '上面有束缚带被挣断的痕迹。'
    },
    locked: false
  },
  escape_pod: {
    id: 'escape_pod',
    name: '逃生舱停泊口',
    description: () => "一扇带有黄色与黑色警示条纹的巨大气密门挡在你面前，门后就是最后的逃生希望。门旁边有一个生物识别读卡器，正闪烁着拒绝访问的红光。",
    exits: { south: 'corridor_main' },
    items: [],
    locked: true, 
    interactables: {
      '读卡器': '屏幕显示：需要 A 级或更高权限授权。'
    }
  }
};

// --- 组件代码 ---

export default function TextAdventureGameRemastered() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [inputValue, setInputValue] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  // 自动滚动到底部
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [gameState.history]);

  // 游戏逻辑处理函数
  const handleAction = (action: string, target?: string) => {
    if (gameState.gameOver || gameState.victory) return;
    const currentRoom = WORLD_MAP[gameState.currentRoom];
    let newState = { ...gameState };
    const verb = action.toLowerCase();
    
    if (['north', 'south', 'east', 'west', 'n', 's', 'e', 'w'].includes(verb)) {
      const directionMap: Record<string, 'north' | 'south' | 'east' | 'west'> = {
        'n': 'north', 'north': 'north', 's': 'south', 'south': 'south', 'e': 'east', 'east': 'east', 'w': 'west', 'west': 'west'
      };
      const direction = directionMap[verb];
      const nextRoomId = currentRoom.exits[direction];

      if (nextRoomId) {
        if (nextRoomId === 'escape_pod' && !gameState.flags['escape_unlocked']) {
             newState.history.push({ type: 'error', text: '[访问拒绝] 气密门已锁定。读卡器闪烁着红光，需要高级门禁卡授权。' });
        } else if (gameState.currentRoom === 'cryo_chamber' && direction === 'north' && gameState.flags.cryo_door_locked) {
             newState.history.push({ type: 'error', text: '防爆门卡死了，这里的电子系统已经失效。你需要用什么东西把它强行撬开。' });
        } else {
          newState.currentRoom = nextRoomId;
          const nextRoom = WORLD_MAP[nextRoomId];
          newState.history.push({ type: 'info', text: `>>> 正在前往: ${nextRoom.name}` });
          newState.history.push({ type: 'narrative', text: nextRoom.description(newState) });
          if (nextRoomId === 'escape_pod' && gameState.flags['escape_unlocked']) {
             newState.history.push({ type: 'success', text: '你冲进了逃生舱，猛击发射按钮！爆炸螺栓分离的巨响传来，逃生舱弹射出飞船。你透过舷窗看着“希望号”在深空中化作一团火球...' });
             newState.history.push({ type: 'success', text: '任务状态更新: 幸存。恭喜通关！' });
             newState.victory = true;
          }
        }
      } else {
        newState.history.push({ type: 'error', text: '路径阻塞。那个方向没有路。' });
      }
    }
    else if (verb === 'look' || verb === 'l' || verb === '观察') {
        newState.history.push({ type: 'info', text: `>>> 扫描环境数据...` });
        newState.history.push({ type: 'narrative', text: currentRoom.description(newState) });
        if (currentRoom.items.length > 0) {
            newState.history.push({ type: 'info', text: `[扫描结果] 检测到可交互物品: ${currentRoom.items.join(', ')}` });
        }
    }
    else if (verb === 'take' || verb === 'pick' || verb === '拿取') {
      if (!target) {
         newState.history.push({ type: 'error', text: '指令错误: 缺少目标参数。你想拿什么？' });
      } else {
        const itemIndex = currentRoom.items.findIndex(i => i.includes(target));
        if (itemIndex > -1) {
          const item = currentRoom.items[itemIndex];
          const updatedWorld = { ...WORLD_MAP };
          WORLD_MAP[newState.currentRoom].items.splice(itemIndex, 1); 
          newState.inventory.push(item);
          newState.history.push({ type: 'success', text: `已获取物品: [${item}]。已加入库存槽位。` });
        } else {
          newState.history.push({ type: 'error', text: '目标不存在或无法获取。' });
        }
      }
    }
    else if (verb === 'use' || verb === '使用') {
        if (!target) {
            newState.history.push({ type: 'error', text: '指令错误: 缺少目标参数。你想使用什么？' });
        } else {
            if (target.includes('撬棍') && newState.inventory.includes('生锈的工业撬棍')) {
                if (gameState.currentRoom === 'cryo_chamber' && gameState.flags.cryo_door_locked) {
                    newState.flags.cryo_door_locked = false;
                    newState.history.push({ type: 'success', text: '你将撬棍插入门缝，用尽全力。伴随着刺耳的金属撕裂声和火花，防爆门终于被撬开了一条缝！' });
                } else {
                    newState.history.push({ type: 'info', text: '当前环境下使用该物品无效。' });
                }
            } 
            else if (target.includes('门禁卡') && newState.inventory.includes('A级红色门禁卡')) {
                 if (gameState.currentRoom === 'corridor_main' || gameState.currentRoom === 'escape_pod') {
                     newState.flags.escape_unlocked = true;
                     newState.history.push({ type: 'success', text: '读卡器变成了绿色。"A级授权确认"。巨大的液压声响起，逃生舱气密门打开了！' });
                 } else {
                     newState.history.push({ type: 'info', text: '附近没有兼容的读卡设备。' });
                 }
            }
            else {
                newState.history.push({ type: 'error', text: '物品不在库存中，或无法在此处使用。' });
            }
        }
    }
    else if (verb === 'help' || verb === '帮助') {
         newState.history.push({ type: 'info', text: '可用指令协议: north/south/east/west (移动), look (扫描), take [物品名] (获取), use [物品名] (交互)。' });
    }
    else {
        newState.history.push({ type: 'error', text: '未知指令错误。输入 "help" 查看协议列表。' });
    }
    setGameState(newState);
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const parts = inputValue.trim().split(' ');
    handleAction(parts[0], parts.slice(1).join(' '));
    setInputValue('');
  };

  const quickAction = (cmd: string) => {
     const parts = cmd.split(' ');
     handleAction(parts[0], parts.slice(1).join(' '));
  };


  // --- UI 渲染 ---
  
  // 自定义荧光样式
  const glowText = "text-green-400 [text-shadow:0_0_5px_rgba(74,222,128,0.5)]";
  const glowBorder = "border-green-500/50 [box-shadow:0_0_10px_rgba(34,197,94,0.2)_inset]";
  const panelBg = "bg-gray-950/80 backdrop-blur-sm";

  return (
    // 主容器：增加暗角背景和更深的底色
    <div className={`flex flex-col h-screen w-full bg-gray-950 ${glowText} font-mono overflow-hidden relative selection:bg-green-900 selection:text-green-100`}>
      
      {/* CRT 效果层 (扫描线 + 屏幕弧度暗角) */}
      <div className="absolute inset-0 pointer-events-none z-50" style={{
        background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
        backgroundSize: '100% 3px, 3px 100%',
        boxShadow: 'inset 0 0 100px rgba(0,0,0,0.8)' // Vignette effect
      }}></div>
      <div className="absolute inset-0 pointer-events-none z-50 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)]"></div>


      {/* Header: 顶部面板 */}
      <div className={`flex justify-between items-center p-3 border-b-2 ${glowBorder} ${panelBg} z-30 sticky top-0`}>
        <div className="flex items-center gap-3">
          <div className="p-1 border border-green-500/30 rounded bg-green-900/20 animate-pulse">
            <Terminal size={22} className="text-green-300" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-[0.2em] uppercase text-green-300 [text-shadow:0_0_10px_rgba(74,222,128,0.8)]">
              星际深渊 <span className="text-sm font-normal opacity-75">| 觉醒协议</span>
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold tracking-widest">
          <Activity size={14} className="animate-pulse text-green-300" />
          <span className="opacity-80">状态: </span>
          <span className="text-green-300 animate-pulse">在线 (紧急模式)</span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden z-20 relative">
        
        {/* Main Terminal Area: 主终端区域 */}
        <div className="flex-1 flex flex-col p-4 md:p-6 overflow-hidden relative">
          
          {/* Terminal History Log */}
          <div className="flex-1 overflow-y-auto mb-4 space-y-4 scrollbar-custom pr-4" style={{ scrollbarGutter: 'stable' }}>
            {gameState.history.map((entry, i) => (
              <div key={i} className={`
                pl-2 border-l-2 
                ${entry.type === 'error' ? 'border-red-500/50 text-red-400 [text-shadow:0_0_5px_rgba(239,68,68,0.5)]' : ''}
                ${entry.type === 'success' ? 'border-yellow-400/50 text-yellow-300 [text-shadow:0_0_5px_rgba(250,204,21,0.5)]' : ''}
                ${entry.type === 'info' ? 'border-green-500/30 text-green-500 opacity-90' : ''}
                ${entry.type === 'narrative' ? 'border-transparent text-green-300 leading-relaxed text-lg py-1' : ''}
              `}>
                {entry.type === 'narrative' && <span className="mr-2 opacity-50 inline-block animate-pulse">{'>'}</span>}
                {entry.text}
              </div>
            ))}
             {gameState.victory && (
                <div className={`mt-8 p-6 border-4 border-double border-green-400 text-center animate-bounce bg-green-900/30 text-2xl font-bold tracking-widest [text-shadow:0_0_15px_rgba(74,222,128,1)]`}>
                    *** 任务完成 - 幸存确认 ***
                </div>
            )}
             {gameState.gameOver && (
                <div className="mt-8 p-6 border-4 border-double border-red-600 text-center bg-red-900/30 text-2xl text-red-500 font-bold tracking-widest [text-shadow:0_0_15px_rgba(239,68,68,1)]">
                    *** 信号丢失 -由于在此系统上禁止运行脚本***
                </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input Command Line: 输入框区域 */}
          <div className={`relative group z-30`}>
            <div className={`absolute -inset-0.5 bg-gradient-to-r from-green-600 to-green-900 rounded opacity-30 blur transition duration-200 group-hover:opacity-50`}></div>
            <form onSubmit={handleInputSubmit} className={`relative flex gap-3 items-center ${panelBg} p-3 rounded-md border border-green-700/50`}>
                <span className="font-bold text-green-300 animate-pulse">[ROOT@HOPE-SHIP]:~$</span>
                <ChevronRight size={20} className="text-green-500" />
                <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="输入指令..."
                className={`flex-1 bg-transparent border-none outline-none text-lg ${glowText} placeholder-green-800/70 caret-green-300`}
                autoFocus
                disabled={gameState.gameOver || gameState.victory}
                spellCheck="false"
                autoComplete="off"
                />
            </form>
          </div>

          {/* Quick Actions Panel: 快捷指令面板 */}
          <div className="mt-6 p-3 border border-green-800/30 rounded bg-green-950/40 backdrop-blur">
             <div className="flex items-center gap-2 mb-2 text-xs font-bold opacity-70 tracking-wider uppercase">
                <Cpu size={14} /> 可用快捷协议
             </div>
             <div className="flex flex-wrap gap-3">
                {/* Base Actions */}
                <button onClick={() => quickAction('look')} className={actionBtnStyle}>
                    <Scan size={16} /> 扫描环境 (LOOK)
                </button>
                {/* Movement Actions */}
                {Object.keys(WORLD_MAP[gameState.currentRoom].exits).map(dir => (
                <button key={dir} onClick={() => quickAction(dir)} className={actionBtnStyle}>
                    前往 {dir === 'north' ? '北' : dir === 'south' ? '南' : dir === 'east' ? '东' : '西'} ({dir.toUpperCase().charAt(0)})
                </button>
                ))}
                {/* Item Pickup Actions */}
                {WORLD_MAP[gameState.currentRoom].items.map(item => (
                    <button key={item} onClick={() => quickAction(`take ${item}`)} className={actionBtnStyle}>
                        <AlertTriangle size={16} className="text-yellow-400/80" /> 获取 {item}
                    </button>
                ))}
                {/* Contextual Use Actions (Highlighed) */}
                {gameState.inventory.includes('生锈的工业撬棍') && gameState.currentRoom === 'cryo_chamber' && gameState.flags.cryo_door_locked && (
                    <button onClick={() => quickAction('use 撬棍')} className={`${highlightBtnStyle} border-yellow-500/50 text-yellow-300 hover:bg-yellow-900/30 hover:border-yellow-400`}>
                        <AlertTriangle size={16} /> 使用 撬棍 (破门)
                    </button>
                )}
                {gameState.inventory.includes('A级红色门禁卡') && (gameState.currentRoom === 'corridor_main' || gameState.currentRoom === 'escape_pod') && !gameState.flags.escape_unlocked && (
                    <button onClick={() => quickAction('use 门禁卡')} className={`${highlightBtnStyle} border-red-500/50 text-red-300 hover:bg-red-900/30 hover:border-red-400`}>
                        <Shield size={16} /> 使用 门禁卡 (解锁)
                    </button>
                )}
            </div>
          </div>
        </div>

        {/* Sidebar (Status Panel): 侧边状态栏 */}
        <div className={`w-80 border-l-2 ${glowBorder} ${panelBg} p-5 hidden md:flex flex-col gap-6 z-30`}>
          
          {/* Location Module */}
          <div className="panel-module">
            <div className="panel-header">
              <Map size={18} className="text-green-300" />
              <span>当前位置定位</span>
            </div>
            <div className="text-xl font-black text-green-300 [text-shadow:0_0_10px_rgba(74,222,128,0.6)] mt-2 border-b border-green-800/50 pb-2">
                {WORLD_MAP[gameState.currentRoom].name}
            </div>
            <div className="text-xs text-green-600 mt-2 font-mono flex justify-between opacity-80">
                <span>甲板层级: {gameState.currentRoom === 'control_room' ? 'A-1 (上层)' : 'B-3 (下层)'}</span>
                <span>坐标: {Math.floor(Math.random() * 99)}-{Math.floor(Math.random() * 999)}</span>
            </div>
          </div>

          {/* Inventory Module */}
          <div className="panel-module flex-1">
            <div className="panel-header">
              <Backpack size={18} className="text-green-300" />
              <span>库存清单 (容量: {gameState.inventory.length}/10)</span>
            </div>
            <div className="mt-3 bg-black/40 rounded p-2 min-h-[150px] border border-green-900/50 inset-shadow">
                {gameState.inventory.length === 0 ? (
                <div className="text-sm text-green-800/70 italic text-center mt-4">{`>>> 空无一物 <<<`}</div>
                ) : (
                <ul className="space-y-2">
                    {gameState.inventory.map((item, idx) => (
                    <li key={idx} className="text-sm text-green-300 flex items-center gap-3 bg-green-900/30 p-2 rounded border border-green-800/30 transition hover:bg-green-800/40 hover:border-green-500/50 group">
                        <div className="w-2 h-2 bg-green-500 rounded-sm group-hover:animate-pulse [box-shadow:0_0_5px_rgba(34,197,94,0.8)]"></div>
                        {item}
                    </li>
                    ))}
                </ul>
                )}
            </div>
          </div>

          {/* Objectives Module */}
          <div className="panel-module mt-auto">
             <div className="panel-header">
              <Shield size={18} className="text-green-300" />
              <span>主要目标协议</span>
            </div>
            <div className="text-sm text-green-500/90 leading-relaxed mt-2 space-y-2">
                <div className={`flex items-center gap-2 ${!gameState.flags.cryo_door_locked ? 'text-green-300 line-through opacity-60' : ''}`}>
                    <div className={`w-3 h-3 border ${!gameState.flags.cryo_door_locked ? 'bg-green-500 border-green-500' : 'border-green-600'} rounded-sm flex items-center justify-center text-[8px]`}>{!gameState.flags.cryo_door_locked && '✓'}</div>
                    逃离冷冻休眠舱
                </div>
                <div className={`flex items-center gap-2 ${gameState.flags.escape_unlocked ? 'text-green-300 line-through opacity-60' : ''}`}>
                    <div className={`w-3 h-3 border ${gameState.flags.escape_unlocked ? 'bg-green-500 border-green-500' : 'border-green-600'} rounded-sm flex items-center justify-center text-[8px]`}>{gameState.flags.escape_unlocked && '✓'}</div>
                    获取逃生手段授权
                </div>
                <div className="flex items-center gap-2 font-bold text-green-300 animate-pulse">
                    <div className="w-3 h-3 border border-red-500 bg-red-500/50 rounded-sm animate-ping"></div>
                    存活并逃离飞船
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for custom components (Tailwind arbitrary values styles) */}
      <style>{`
        .scrollbar-custom::-webkit-scrollbar {
          width: 8px;
          background: rgba(0, 20, 0, 0.3);
        }
        .scrollbar-custom::-webkit-scrollbar-thumb {
          background: rgba(34, 197, 94, 0.3);
          border: 1px solid rgba(34, 197, 94, 0.5);
          border-radius: 4px;
        }
        .scrollbar-custom::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 197, 94, 0.6);
          box-shadow: 0 0 10px rgba(34, 197, 94, 0.5);
        }
        
        .panel-module {
            @apply border border-green-800/40 bg-green-950/50 p-4 rounded-lg backdrop-blur relative overflow-hidden;
            box-shadow: inset 0 0 20px rgba(0,0,0,0.5);
        }
        .panel-header {
            @apply flex items-center gap-2 mb-2 text-green-400 border-b border-green-800/50 pb-2 text-sm font-bold tracking-wider uppercase opacity-90;
        }
        .inset-shadow {
            box-shadow: inset 0 2px 10px rgba(0,0,0,0.8);
        }
      `}</style>
    </div>
  );
}

// Shared Button Styles
const actionBtnStyle = "px-4 py-2 bg-green-950/60 border border-green-800/60 hover:bg-green-900/80 hover:border-green-400 hover:[box-shadow:0_0_15px_rgba(34,197,94,0.3)] text-xs rounded flex items-center gap-2 transition-all duration-200 font-bold tracking-wider group active:scale-95 text-green-400/80 hover:text-green-200";
const highlightBtnStyle = "px-4 py-2 bg-black/60 border text-xs rounded flex items-center gap-2 transition-all duration-300 font-bold tracking-wider animate-pulse hover:animate-none [box-shadow:0_0_10px_inset] active:scale-95";