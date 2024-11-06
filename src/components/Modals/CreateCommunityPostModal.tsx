interface CreateCommunityPostModalProps {
    communityId: string;
    communityName: string;
    isOpen: boolean;
    modalClose: () => void;
}

export function CreateCommunityPostModal(CreateCommunityPostModalProps: CreateCommunityPostModalProps) {
    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center ${
                CreateCommunityPostModalProps.isOpen ? 'block' : 'hidden'
            }`}
        >
            <div
                className='fixed inset-0 bg-black opacity-50'
                onClick={CreateCommunityPostModalProps.modalClose}
            ></div>
            <div className='bg-zinc-900 rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full'>
                <div className='px-4 py-5 sm:p-6'>
                    <h3 className='text-lg leading-6 font-medium text-white'>
                        Create a Post
                    </h3>
                    <div className='mt-2'>
                        <input
                            type='text'
                            placeholder='Title'
                            className='w-full p-2 mt-2 bg-zinc-800 text-white rounded-lg'
                        />
                        <textarea
                            placeholder='Content'
                            className='w-full p-2 mt-2 bg-zinc-800 text-white rounded-lg'
                        ></textarea>
                        <button className='p-2 mt-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700'>
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}