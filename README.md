# 🎯 Visualizador ShellSort

![React](https://img.shields.io/badge/React-19.x-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38bdf8.svg)

## 📚 Informações Acadêmicas

**Instituição:** Cotemig </br>
**Curso:** Ciência da Computação / Sistemas de Informação </br>
**Disciplina:** Algoritmos e Estrutura de Dados (AED) </br>
**Professor:** Virgílio </br>
**Período:** 2º Período </br>
**Aluno:** Leonardo </br>
**Ano:** 2025 </br>

---

## 📋 Sobre o Projeto

Este projeto é uma aplicação web interativa desenvolvida para visualizar o funcionamento do algoritmo de ordenação **ShellSort**. Criado como trabalho acadêmico da disciplina de AED, o visualizador permite acompanhar passo a passo todas as operações realizadas pelo algoritmo, incluindo comparações, movimentações e inserções de elementos.

O projeto foi desenvolvido com base em uma implementação original em C# e transposto para uma aplicação React moderna com TypeScript, oferecendo uma interface intuitiva e educativa para compreensão do algoritmo.

---

## Algoritimo Utilizado

``` C#
public static void shellSort(int[] vet)
{
    int i, j, x, n;
    int h = 1;
    n = vet.Length;
    do
    {
        h = h * 3 + 1;
    } while (h <= n);
    do
    {
        h /= 3;
        for (i = h; i < n; i++)
        {
            x = vet[i];
            j = i;
            while (j > (h - 1) && vet[j - h] > x)
            {
                vet[j] = vet[j - h];
                j -= h;
            }
            vet[j] = x;
        }
    } while (h != 1);
}
```

---

## 🎯 Objetivos

- Demonstrar visualmente o funcionamento do algoritmo ShellSort
- Facilitar o aprendizado através de animações e feedback visual
- Permitir interação do usuário com diferentes conjuntos de dados
- Aplicar conceitos de estrutura de dados e algoritmos de ordenação
- Desenvolver habilidades em React, TypeScript e desenvolvimento web

---

## 🚀 Tecnologias Utilizadas

- **React 19.x** - Biblioteca para construção de interfaces
- **TypeScript** - Superset JavaScript com tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **Lucide React** - Biblioteca de ícones
- **Vite** - Build tool e dev server (recomendado)

---

## 🔍 Sobre o Algoritmo ShellSort

O ShellSort é um algoritmo de ordenação desenvolvido por Donald Shell em 1959. É uma generalização do insertion sort que permite a troca de itens distantes. O algoritmo:

1. **Define um intervalo (gap)** inicial calculado pela fórmula `h = h * 3 + 1`
2. **Ordena sublistas** separadas pelo intervalo h
3. **Reduz o intervalo** dividindo por 3 a cada iteração
4. **Finaliza** quando h = 1 (equivalente ao insertion sort)

### Complexidade

- **Melhor caso:** O(n log n)
- **Caso médio:** Depende da sequência de gaps (aproximadamente O(n^(3/2)))
- **Pior caso:** O(n²)
- **Espaço:** O(1) - ordenação in-place

---

## 📝 Referências

- **Algoritmo Original**: Implementação em C# fornecida pelo Prof. Virgílio
- [Shell Sort - Wikipedia](https://pt.wikipedia.org/wiki/Shell_sort)
- [Documentação React](https://react.dev/)
- [Documentação TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 👨‍💻 Autor

**Leonardo**  
Aluno do 2º Período - Cotemig  
Disciplina: Algoritmos e Estrutura de Dados

---

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais como parte das atividades da disciplina de AED na Cotemig.