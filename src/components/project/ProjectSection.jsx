
import { SectionWrapper } from '../atom/SectionWrapper';
import { Project } from './Project';
import { getListOfUrlRepositoriesUrl } from '../../lib/api-url';
import { GITHUB_USERNAME } from '../../lib/config';
import { Loader } from '../atom/Loader/Loader';
import { useFetch } from '../../hooks/useFetch';

export const ProjectSection = () => {

const { error, data, isLoading } = useFetch(getListOfUrlRepositoriesUrl(GITHUB_USERNAME));

  if (isLoading) return <Loader />

  if (error) return <p className='text-center text-3xl'>{error.message}</p>

  return (
    <SectionWrapper title="Projects">
      <div className="flex flex-wrap justify-center gap-8">
        {data?.map((repo) => <Project key={repo.name} {...repo} />)}
      </div>
    </SectionWrapper>
  );
};
