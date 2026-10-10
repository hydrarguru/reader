interface DrawerSeparatorProps {
    title: string;
}

export function DrawerSeparator(DrawerSeparatorProps: DrawerSeparatorProps) {
    return (
        <div className='w-full px-4 pt-5 pb-1'>
            <span className='text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground'>
                {DrawerSeparatorProps.title || 'Separator'}
            </span>
        </div>
    );
}
