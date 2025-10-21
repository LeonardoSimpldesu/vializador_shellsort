/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';

interface SortStep {
  array: number[];
  comparing: number[];
  swapping: number[];
  h: number;
  description: string;
}

const ShellSortVisualizer: React.FC = () => {
  const [array, setArray] = useState<number[]>([64, 34, 25, 12, 22, 11, 90, 88, 45, 50]);
  const [history, setHistory] = useState<SortStep[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(500);
  const [inputValue, setInputValue] = useState<string>('64,34,25,12,22,11,90,88,45,50');

  const generateShellSortSteps = (arr: number[]): SortStep[] => {
    const steps: SortStep[] = [];
    const vet: number[] = [...arr];
    const n: number = vet.length;
    let h: number = 1;

    steps.push({
      array: [...vet],
      comparing: [],
      swapping: [],
      h: 0,
      description: 'Array inicial'
    });

    // Calcular h inicial
    do {
      h = h * 3 + 1;
    } while (h <= n);

    do {
      h = Math.floor(h / 3);

      steps.push({
        array: [...vet],
        comparing: [],
        swapping: [],
        h: h,
        description: `Intervalo h = ${h}`
      });

      for (let i: number = h; i < n; i++) {
        const x: number = vet[i];
        let j: number = i;

        steps.push({
          array: [...vet],
          comparing: [i],
          swapping: [],
          h: h,
          description: `Selecionando elemento ${x} na posição ${i}`
        });

        while (j > (h - 1) && vet[j - h] > x) {
          steps.push({
            array: [...vet],
            comparing: [j, j - h],
            swapping: [],
            h: h,
            description: `Comparando ${vet[j - h]} > ${x}`
          });

          vet[j] = vet[j - h];

          steps.push({
            array: [...vet],
            comparing: [],
            swapping: [j, j - h],
            h: h,
            description: `Movendo ${vet[j]} da posição ${j - h} para ${j}`
          });

          j -= h;
        }

        if (vet[j] !== x) {
          vet[j] = x;
          steps.push({
            array: [...vet],
            comparing: [],
            swapping: [j],
            h: h,
            description: `Inserindo ${x} na posição ${j}`
          });
        }
      }
    } while (h !== 1);

    steps.push({
      array: [...vet],
      comparing: [],
      swapping: [],
      h: 0,
      description: 'Array ordenado!'
    });

    return steps;
  };

  const handleStart = (): void => {
    const steps: SortStep[] = generateShellSortSteps(array);
    setHistory(steps);
    setCurrentStep(0);
    setIsPlaying(true);
  };

  const handleReset = (): void => {
    setIsPlaying(false);
    setCurrentStep(0);
    setHistory([]);
  };

  const handleNewArray = (): void => {
    try {
      const newArr: number[] = inputValue
        .split(',')
        .map(num => parseInt(num.trim()))
        .filter(n => !isNaN(n));
      if (newArr.length > 0) {
        setArray(newArr);
        handleReset();
      }
    } catch (_) {
      alert('Formato inválido. Use números separados por vírgula.');
    }
  };

  const handleRandomArray = (): void => {
    const size: number = 10;
    const newArr: number[] = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
    setArray(newArr);
    setInputValue(newArr.join(','));
    handleReset();
  };

  useEffect(() => {
    if (isPlaying && currentStep < history.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else if (currentStep === history.length - 1) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentStep, history.length, speed]);

  const currentState: SortStep = history[currentStep] || {
    array: array,
    comparing: [],
    swapping: [],
    h: 0,
    description: 'Pronto para começar'
  };

  const maxValue: number = Math.max(...array, ...currentState.array);

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 to-blue-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">
            Visualizador ShellSort
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Baseado no algoritmo em C#
          </p>

          {/* Controles */}
          <div className="mb-8 space-y-4">
            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={inputValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                placeholder="Digite números separados por vírgula"
              />
              <button
                onClick={handleNewArray}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Aplicar
              </button>
              <button
                onClick={handleRandomArray}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Aleatório
              </button>
            </div>

            <div className="flex gap-3 justify-center items-center">
              <button
                onClick={handleStart}
                disabled={isPlaying || history.length > 0}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
              >
                <Play size={20} /> Iniciar
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                disabled={history.length === 0}
                className="flex items-center gap-2 px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                {isPlaying ? 'Pausar' : 'Continuar'}
              </button>

              <button
                onClick={() => currentStep < history.length - 1 && setCurrentStep(prev => prev + 1)}
                disabled={history.length === 0 || currentStep >= history.length - 1}
                className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
              >
                <SkipForward size={20} /> Próximo
              </button>

              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                <RotateCcw size={20} /> Resetar
              </button>
            </div>

            <div className="flex items-center gap-4 justify-center">
              <label className="text-gray-700 font-medium">Velocidade:</label>
              <input
                type="range"
                min="100"
                max="2000"
                step="100"
                value={speed}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSpeed(Number(e.target.value))}
                className="w-64"
              />
              <span className="text-gray-600 min-w-[80px]">{speed}ms</span>
            </div>
          </div>

          {/* Informações do passo atual */}
          <div className="mb-6 p-4 bg-indigo-50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <p className="text-lg font-semibold text-gray-800">
                {currentState.description}
              </p>
              <span className="text-sm text-gray-600">
                Passo {currentStep + 1} de {history.length || 1}
              </span>
            </div>
            {currentState.h > 0 && (
              <p className="text-indigo-700 font-medium">
                Intervalo atual (h): {currentState.h}
              </p>
            )}
          </div>

          {/* Visualização do Array */}
          <div className="flex items-end justify-center gap-2 h-80 mb-8 p-4 bg-gray-50 rounded-lg">
            {currentState.array.map((value: number, idx: number) => {
              const isComparing: boolean = currentState.comparing.includes(idx);
              const isSwapping: boolean = currentState.swapping.includes(idx);
              const height: number = (value / maxValue) * 250;

              return (
                <div key={idx} className="flex flex-col items-center gap-2">
                  <span className={`text-sm font-bold ${isComparing ? 'text-yellow-600' :
                      isSwapping ? 'text-green-600' :
                        'text-gray-700'
                    }`}>
                    {value}
                  </span>
                  <div
                    className={`w-12 rounded-t-lg transition-all duration-300 ${isComparing ? 'bg-yellow-400' :
                        isSwapping ? 'bg-green-400' :
                          'bg-indigo-500'
                      }`}
                    style={{ height: `${height}px` }}
                  />
                  <span className="text-xs text-gray-500">{idx}</span>
                </div>
              );
            })}
          </div>

          {/* Legenda */}
          <div className="flex justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-indigo-500 rounded"></div>
              <span>Normal</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-400 rounded"></div>
              <span>Comparando</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-400 rounded"></div>
              <span>Movendo/Inserindo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShellSortVisualizer;