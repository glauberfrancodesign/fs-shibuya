import { create } from 'zustand';
import { TestBlock } from '../types';

interface TestBuilderState {
  blocks: TestBlock[];
  setBlocks: (blocks: TestBlock[]) => void;
  moveBlock: (fromIndex: number, toIndex: number) => void;
  updateBlock: (blockId: string, updates: Partial<TestBlock>) => void;
}

export const useTestBuilderStore = create<TestBuilderState>((set) => ({
  blocks: [],
  setBlocks: (blocks) => set({ blocks }),
  moveBlock: (fromIndex, toIndex) => set((state) => {
    const newBlocks = [...state.blocks];
    const [movedBlock] = newBlocks.splice(fromIndex, 1);
    newBlocks.splice(toIndex, 0, movedBlock);
    return { blocks: newBlocks };
  }),
  updateBlock: (blockId, updates) => set((state) => ({
    blocks: state.blocks.map((block) =>
      block.id === blockId ? { ...block, ...updates } : block
    ),
  })),
}));
