export default function DialogIkon(props) {
    return (
        //biome-ignore lint/a11y/noSvgWithoutTitle: biome migration
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
            <g fill="#3e3832">
                <path d="M16.5 8.75c.476 0 .941.045 1.399.115.065-.379.101-.771.101-1.18C18 3.585 13.962.25 9 .25c-4.963 0-9 3.335-9 7.435 0 1.962.855 3.826 2.36 5.178l-1.794 3.14a.5.5 0 00.62.712l4.839-1.937c.435.124.887.218 1.348.281.022.002.065-.005.075.004.075 0 .319-.002.678-.022.679-3.514 4.233-6.291 8.374-6.291z" />
                <path d="M16.5 9.75c-4.065 0-7.5 2.977-7.5 6.5 0 3.355 2.878 6.224 6.434 6.572a7.581 7.581 0 003.578-.534l3.813 1.43a.498.498 0 00.623-.691l-1.325-2.65C23.327 19.289 24 17.868 24 16.25c0-3.523-3.435-6.5-7.5-6.5z" />
            </g>
        </svg>
    );
}
