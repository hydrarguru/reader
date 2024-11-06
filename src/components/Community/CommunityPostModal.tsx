import { Post } from '../../types/PostType';

interface CommunityPostModalProps {
  post: Post;
  isOpen: boolean;
  modalClose: () => void;
}

export function CommunityPostModal(CommunityPostModalProps: CommunityPostModalProps) {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        CommunityPostModalProps.isOpen ? 'block' : 'hidden'
      }`}
    >
      <div
        className='fixed inset-0 bg-black opacity-50'
        onClick={CommunityPostModalProps.modalClose}
      ></div>
      <div className='bg-zinc-900 rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full'>
        <div className='px-4 py-5 sm:p-6'>
          <h3 className='text-lg leading-6 font-medium text-white'>
            {CommunityPostModalProps.post.post_title}
          </h3>
          <div className='mt-2'>
            <p className='text-sm text-white'>{CommunityPostModalProps.post.post_content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
