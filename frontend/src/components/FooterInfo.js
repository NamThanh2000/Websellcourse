function check_a(is_a, children) {
    if (is_a === true) {
        return <li>
            <a href="/">
                {children}
            </a>
        </li>
    }
    else {
        return <li>
            {children}
        </li>
    }
}
export default function FooterInfo({ is_a = false, children }) {
    return <>
        {check_a(is_a, children)}
    </>
}