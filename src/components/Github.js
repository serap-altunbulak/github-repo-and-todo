import React, { Component } from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';
import Repo from './Repo';
import { Button, TextField } from '@material-ui/core';

class Github extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '', repos: [], errorMessage: '' };
    }
    handleChange = (event) => {
        this.setState({ username: event.target.value }, () => {
            this.getRepos();
        });
    };

    getRepos = debounce(() => {
        const repoUrl = `https://api.github.com/users/${this.state.username}/repos`;
        axios
            .get(repoUrl)
            .then((responses) => {
                const repos = responses.data.map(
                    ({ name, language, html_url, description }) => {
                        return {
                            name,
                            language,
                            html_url,
                            description,
                        };
                    }
                );
                this.setState({ repos });
            })
            .catch((error) => {
                console.log(`inside getrepos error: ${error}`);
                this.setState({
                    errorMessage: error.response.statusText,
                });
            });
    }, 1000);

    displayRepos() {
        return this.state.repos.map((repo) => (
            <Repo key={repo.name} repo={repo} />
        ));
    }

    render() {
        return (
            <React.Fragment>
                <div className='github-form' onClick={this.getRepos}>
                    <TextField
                        fullWidth
                        variant='filled'
                        autoComplete='off'
                        label='Enter your github username'
                        type='text'
                        name='repo'
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                    <Button type='button'>List My Repos</Button>
                </div>

                {this.state.repos.length > 0 && (
                    <div>{this.displayRepos()}</div>
                )}
                {this.state.repos.length === 0 && (
                    <div>{this.state.errorMessage}</div>
                )}
            </React.Fragment>
        );
    }
}

export default Github;
