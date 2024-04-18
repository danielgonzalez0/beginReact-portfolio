import { useEffect, useState } from 'react';
import { SectionWrapper } from '../atom/SectionWrapper';
import { Project } from './Project';
import { getListOfUrlRepositoriesUrl } from '../../lib/api-url';
import { GITHUB_USERNAME } from '../../lib/config';
import { Loader } from '../atom/Loader/Loader';

export const ProjectSection = () => {

  const [repositories, setRepositories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  // GitHub Repository - Exercise
  useEffect(() => {
    fetch(getListOfUrlRepositoriesUrl(GITHUB_USERNAME))
      .then((res) => res.json())
      .then((repo) => {
        if(repo.error) throw new Error("Error fetching repositories")
        setRepositories(repo)
      })
      .catch((err) => setError(err))
      .finally(() => {
        console.log(repositories);
        setTimeout(() =>setLoading(false),1500)});
      
  }, []);

  if(loading) return <Loader/>

  if(error) return <p className='text-center text-3xl'>{error.message}</p>

  return (
      <SectionWrapper title="Projects">
        <div className="flex flex-wrap justify-center gap-8">
            {repositories.map((repo, index) => <Project key={index} {...repo} />)}
        </div>
      </SectionWrapper>
    );
};
