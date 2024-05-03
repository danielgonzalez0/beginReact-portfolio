


import { useFetch } from '../../hooks/useFetch';
import { commentsUrl } from '../../lib/api-url';
import { Loader } from '../atom/Loader/Loader';
import { SectionWrapper } from '../atom/SectionWrapper';
import { Comment } from './Comment';
import { CommentForm } from './CommentForm';

export const CommentSection = () => {

  const {data, error, isLoading, runFetch} = useFetch(commentsUrl)
  console.log(data, error, isLoading);

  if (isLoading) return <Loader/>

  if (error) return <p className='text-center text-3xl'>{error.message}</p>


  return (
    <SectionWrapper title="On est à l'époque de FaceBook ?">
      <div className="flex flex-col items-center w-full max-w-2xl gap-8 m-auto ">
        <div className="grid justify-center w-full gap-4 grid-cols-auto-fill-200-300">
          {data?.map((comment) => (
          <Comment key={comment.id} {...comment} />))}
        </div>
        <CommentForm updateComments={runFetch}/>
      </div>
    </SectionWrapper>
  );
};
