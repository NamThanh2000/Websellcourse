import { Context } from '../contexts/Context';
import { useContext } from 'react';
import { useHistory } from "react-router-dom";

const changePage = (i, setDataSearch, history) => {
    setDataSearch(i)
    history.push("/search") 
}

function table(linkContent, setDataSearch, history) {
    const arrlinkContent = [];
    for (let i in linkContent) {
        arrlinkContent.push(
            <li onClick={() => {changePage(i, setDataSearch, history)}} key = {i}>
                <i className="bi bi-brush" />
                {i}
            </li>
        );
    }
    return arrlinkContent;
}

export default function ListCourses({ content, linkContent }) {
    const { setDataSearch } = useContext(Context);
    const history = useHistory();

    return <li className="app__home__container__rowbody__category__listcourses__courses">
        <i className="bi bi-journal-bookmark-fill"></i>
        <span>{content}</span>
        <i className="app__home__container__rowbody__category__listcourses__courses__icon-open-table bi bi-chevron-down"></i>
        <div>
            <ul> { table(linkContent, setDataSearch, history) } </ul>
        </div>
    </li>
}