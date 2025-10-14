type Props = {
    text: string;
};

export default function Message({ text }: Props) {
    return <div className='text-center'>{text}</div>;
}
