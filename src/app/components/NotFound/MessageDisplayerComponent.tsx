import React, { ComponentType } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useHistory } from 'react-router-dom';
import { Maybe } from '@app/models';

interface MessageDisplayerComponentProps {
  mainMessage: Maybe<string> | undefined;
  title: string | null;
  icon: ComponentType<any> | undefined;
}

const MessageDisplayerComponent: React.FunctionComponent<MessageDisplayerComponentProps> = ({ mainMessage, title, icon }) => {
  function GoHomeBtn() {
    const history = useHistory();
    function handleClick() {
      history.push('/');
    }
    return (
      <Button onClick={handleClick}>Take me home</Button>
    );
  }

  return (
    <Box
      sx={{
        mx: 'auto',
        p: 1,
        m: 1,
        textAlign: 'center',
        fontSize: '0.875rem',
        fontWeight: '700',
      }}
    >
      <IconButton aria-label="delete" disabled color="primary" sx={{ fontSize: 80 }}>{icon}</IconButton>
      <Typography variant="h4">{title}</Typography>
      <Typography >{mainMessage}</Typography>
    </Box>
  )
};

export { MessageDisplayerComponent };
