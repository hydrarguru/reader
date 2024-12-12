interface DrawerSeparatorProps {
    title: string;
}

export function DrawerSeparator(DrawerSeparatorProps: DrawerSeparatorProps) {
    return (
        <div className='flex items-center w-full my-2 mx-2'>
            <div className='flex-grow border-t border-violet-700 dark:border-violet-700 w-[calc(100%-32px)] mx-2' />
            <span className='px-2 text-violet-600 dark:text-neutral-100'>{DrawerSeparatorProps.title || 'Separator'}</span>
            <div className='flex-grow border-t border-violet-700 dark:border-violet-700 w-[calc(100%-32px)] mx-2' />
        </div>
    );
}