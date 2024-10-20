// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

import { ActionIcon, Flex, rem, Tabs } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import { RiCloseFill } from 'react-icons/ri';
import { IconMessageCircle, IconPhoto } from '@tabler/icons-react';
import { Extensions } from './tabs/Extensions';
import { Settings } from './tabs/Settings';
import { Tester } from './tabs/Tester';

export function IndexPage() {
  const iconStyle = { width: rem(12), height: rem(12) };
  const navigate = useNavigate();
  const { tabValue } = useParams();

  return (
    <Flex direction='column' flex='1 1 auto'>
      <Flex>
        <Flex className='drag-region' flex='1 1 auto'></Flex>
        <Flex>
          <ActionIcon
            variant='subtle'
            aria-label='Settings'
            onClick={() => window.close()}
          >
            <RiCloseFill style={{ width: '70%', height: '70%' }} />
          </ActionIcon>
        </Flex>
      </Flex>
      <Tabs
        defaultValue='extensions'
        color='gray'
        value={tabValue}
        onChange={(value) => navigate(`/${value}`)}
        flex={1}
        display='flex'
        style={{ overflow: 'hidden', flexDirection: 'column' }}
      >
        <Tabs.List justify='center'>
          <Tabs.Tab
            value='extensions'
            leftSection={<IconPhoto style={iconStyle} />}
          >
            Extensions
          </Tabs.Tab>
          <Tabs.Tab
            value='settings'
            leftSection={<IconMessageCircle style={iconStyle} />}
          >
            Settings
          </Tabs.Tab>
          <Tabs.Tab
            value='tester'
            leftSection={<IconMessageCircle style={iconStyle} />}
          >
            Tester
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel
          value='extensions'
          flex={1}
          style={{ flexGrow: 0, overflow: 'hidden' }}
        >
          <Extensions />
        </Tabs.Panel>
        <Tabs.Panel
          value='settings'
          flex={1}
          style={{ flexGrow: 0, overflow: 'hidden' }}
        >
          <Settings />
        </Tabs.Panel>
        <Tabs.Panel
          value='tester'
          flex={1}
          style={{ flexGrow: 0, overflow: 'hidden' }}
        >
          <Tester />
        </Tabs.Panel>
      </Tabs>
    </Flex>
  );
}
