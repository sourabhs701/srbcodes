'use client';

import { MorphingText } from '@/src/components/magicui/morphing-text';

export default function Loader() {
    return (
        <div className="fixed inset-0 bg-black text-white flex items-center justify-center z-[9999]">
            <MorphingText
                texts={['Loading', 'Please Wait', 'Almost There', 'Initializing']}
                className="text-white"
            />
        </div>
    );
}
