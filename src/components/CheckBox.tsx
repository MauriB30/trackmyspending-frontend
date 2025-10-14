type Props = {
    checked: boolean;
    onChange: () => void;
};

export default function CheckBox({ ...props }: Props) {
    return (
        <label className='relative cursor-pointer'>
            <input
                type='checkbox'
                checked={props.checked}
                onChange={props.onChange}
                className='peer bg-terceary hidden size-9 appearance-none rounded'
            />
            <div className="bg-terceary flex size-5 items-center justify-center rounded peer-checked:after:text-2xl peer-checked:after:font-bold peer-checked:after:text-white peer-checked:after:content-['✓']"></div>
        </label>
    );
}
