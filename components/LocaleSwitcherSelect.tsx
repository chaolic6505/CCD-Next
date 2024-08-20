'use client';

import clsx from 'clsx';
import { useTransition } from 'react';
import { CheckIcon, LanguagesIcon } from 'lucide-react';

import { Locale } from '@/constants/locale';
import * as Select from '@radix-ui/react-select';
import { setUserLocale } from '@/services/locale';

type Props = {
    defaultValue: string;
    items: Array<{ value: string; label: string; }>;
    label: string;
};

export default function LocaleSwitcherSelect({
    label,
    items,
    defaultValue,
}: Props) {
    const [isPending, startTransition] = useTransition();

    function onChange(value: string) {
        const locale = value as Locale;
        startTransition(() => {
            setUserLocale(locale);
        });
    }

    return (
        <div className="relative">
            <Select.Root defaultValue={defaultValue} onValueChange={onChange}>
                <Select.Trigger
                    aria-label={label}
                    className={clsx(
                        'rounded-sm p-2 transition-colors hover:bg-primary',
                        isPending && 'pointer-events-none opacity-60'
                    )}
                >
                    <Select.Icon>
                        <LanguagesIcon className="h-6 w-6 text-slate-600 transition-colors group-hover:text-slate-900" />
                    </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                    <Select.Content
                        align="end"
                        position="popper"
                        className="min-w-[8rem] overflow-hidden rounded-sm bg-ghost py-1 shadow-md"
                    >
                        <Select.Viewport>
                            {items.map((item) => (
                                <Select.Item
                                    key={item.value}
                                    value={item.value}
                                    className="flex cursor-default items-center px-3 py-2 data-[highlighted]:bg-slate-500"
                                >
                                    <div className="mr-2 w-[1rem]">
                                        {item.value === defaultValue && (
                                            <CheckIcon className="h-5 w-5 dark:text-violet-50 light:text-violet-400" />
                                        )}
                                    </div>
                                    <span className="dark:text-violet-50 light:text-violet-400">{item.label}</span>
                                </Select.Item>
                            ))}
                        </Select.Viewport>
                        <Select.Arrow className="fill-white text-white" />
                    </Select.Content>
                </Select.Portal>
            </Select.Root>
        </div>
    );
}