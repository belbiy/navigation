import React, { useState } from 'react';
import { Flex, View } from '@adobe/react-spectrum';
import Add from '@react-spectrum/s2/icons/Add';
import { ActionButton, TextField, MenuTrigger, Menu, MenuItem, Text, Button, Divider, ActionButtonGroup } from '@react-spectrum/s2';
import UploadToCloud from '@react-spectrum/s2/icons/UploadToCloud';
import Microphone from '@react-spectrum/s2/icons/Microphone';

import aiSparkles from '../assets/icons/AiSparkles.svg';

const PromptBar: React.FC = () => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View
            borderRadius="large"
            backgroundColor="static-white"
            UNSAFE_style={{
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                position: 'relative',
                overflow: 'hidden',
                margin: '0 0 -60px',
                border: isFocused ? '2px solid #1473E6' : '2px solid transparent',
                transition: 'border-color 0.2s ease-in-out'
            }}
        >
            <Flex alignItems="center">
                <TextField
                    aria-label="Describe experience"
                    UNSAFE_style={{
                        padding: '16px 116px 16px 16px',
                        width: '100%',
                        border: 'none'
                    }}
                    placeholder="Describe experience you want to create or ask a question"
                    UNSAFE_className="prompt-bar-text-field"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
                <style>
                    {`
          .prompt-bar-text-field * {
            border: none;
          }
          .prompt-bar-text-field input::placeholder {
            color: #666;
            font-size: 16px;
          }
          .prompt-bar-text-field input {
            font-size: 16px;
          }
        `}
                </style>
                <View position="absolute" end="size-150">
                    <Flex alignItems="center" alignContent="center" alignSelf="center" gap="size-200">
                        <ActionButtonGroup isQuiet>
                            <ActionButton aria-label="Upload" ><UploadToCloud /></ActionButton>
                            <ActionButton aria-label="Dictate" ><Microphone /></ActionButton>
                        </ActionButtonGroup>
                            
                        <Divider orientation="vertical" />
                        <Button
                            variant="accent"
                            aria-label="Submit"
                            UNSAFE_style={{
                                backgroundColor: '#CB5CBA',
                                background: 'linear-gradient(135deg, #D73220 0%, #D92361 33%, #7155FA 100%)',
                                color: 'white',
                                borderRadius: '100px',
                                width: '40px',
                                height: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minWidth: 'auto',
                                padding: 0
                            }}
                        >
                            <img src={aiSparkles} alt="AI Sparkles" style={{ filter: 'brightness(0) invert(1)' }} />
                        </Button>
                    </Flex>
                </View>
            </Flex>
        </View>
    );
};

export default PromptBar;


/*
<MenuTrigger>
                            <ActionButton aria-label="Actions for selected resource" isQuiet><Add /></ActionButton>
                            <Menu>
                                <MenuItem><UploadToCloud /> <Text>Upload...</Text></MenuItem>
                                <MenuItem><Microphone /> <Text>Dictate...</Text></MenuItem>
                            </Menu>
                        </MenuTrigger>*/