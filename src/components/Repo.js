import React from 'react';

const Repo = ({ repo: { name, language, html_url, description } }) => {
    return (
        <React.Fragment>
            <li style={{ listStyleType: 'none', textAlign: 'left' }}>
                <br />
                <a href={html_url} target='_blank' rel='noreferrer'>
                    Name: {name}
                </a>
                {language && <div>Language: {language}</div>}
                {description && <div>Description: {description}</div>}
                <br />
            </li>
        </React.Fragment>
    );
};
export default Repo;
