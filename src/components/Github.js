import { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardMedia,
    CardContent,
} from '@mui/material';

function Github() {
    const [avatarURL, setAvatarURL] = useState();
    const [githubUsername, setGitHubUsername] = useState();
    const [repoData, setRepoData] = useState();

    const repoDataURL = async () => {
        //Get repo data about github user
        await fetch('https://api.github.com/users/serap-altunbulak/repos')
            .then((res) => res.json())
            .then(
                (result) => {
                    console.log(36, result);
                    const list = result.map((item) => (
                        <div className='text-center'>
                            <a
                                target='_blank'
                                href={item.svn_url}
                                rel='noreferrer'
                            >
                                {item.name}
                            </a>
                        </div>
                    ));
                    setRepoData(list);
                },
                (error) => {
                    console.log(error);
                }
            );
    };

    useEffect(() => {
        fetch('https://api.github.com/users/serap-altunbulak')
            .then((res) => res.json())
            .then(
                (result) => {
                    console.log(result);
                    setAvatarURL(result.avatar_url);
                    setGitHubUsername(result.login);
                },
                (error) => {
                    console.log(error);
                }
            );
    }, []);
    return (
        <div>
            <Card
                sx={{ maxWidth: 345, marginBottom: '25px' }}
                className='center'
            >
                <CardActionArea>
                    <CardMedia
                        component='img'
                        height='275'
                        image={avatarURL}
                        alt='avatar'
                    />
                    <CardContent>
                        <Typography gutterBottom variant='h5' component='div'>
                            {githubUsername}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions className='center'>
                    <Button
                        fullWidth={true}
                        size='small'
                        color='primary'
                        variant='outlined'
                        onClick={repoDataURL}
                    >
                        List My Repos
                    </Button>
                </CardActions>
            </Card>
            <Typography style={{ textAlign: 'left' }}>{repoData}</Typography>
        </div>
    );
}

export default Github;
