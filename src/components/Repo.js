import React from 'react';

const Repo = ({ repo: { name, language, html_url, description, topics } }) => {
    return (
        <React.Fragment>
            <li className='repo-elements'>
                <a href={html_url} target='_blank' rel='noreferrer'>
                    Name: {name}
                </a>
                {language && <div>Language: {language}</div>}
                {description && <div>Description: {description}</div>}
                <li className='tags'>
                    {topics.map((tag) => (
                        <p className='tag-elements'>{tag}</p>
                    ))}
                </li>
            </li>
        </React.Fragment>
    );
};
export default Repo;
