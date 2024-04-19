
import { SectionWrapper } from '../atom/SectionWrapper';
import { MemoryBoard } from './MemoryBoard';
import { MemoryContextProvider } from './MemoryProvider';
import MemoryReset from './MemoryReset';
import MemoryScore from './MemoryScore';

export const MemorySection = () => {
  return (
    <SectionWrapper title="You're boring ? Let's play a game !">
      <MemoryContextProvider>
        <div className="flex flex-col items-center gap-14">
          <div className="flex flex-col items-center gap-2">
            <MemoryScore />
            <MemoryBoard />
            <MemoryReset />
          </div>
        </div>
      </MemoryContextProvider>
    </SectionWrapper>
  );
};
