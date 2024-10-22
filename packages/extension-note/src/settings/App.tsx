import '@mantine/tiptap/styles.css';
import {
  Divider,
  ActionIcon,
  Flex,
  ScrollArea,
  Text,
  Card,
  Input,
} from '@mantine/core';
import { RiCloseFill, RiAddFill, RiMoreFill } from 'react-icons/ri';
import Meta from '../../package.json';
import { NoteData } from '../shared/types.ts';
import { useExtensionItems } from '@note/ui/hooks/useExtensionItems';
import { useNativeContextMenu } from '@note/ui/hooks/useNativeContextMenu';

export function App() {
  const contents = useExtensionItems<NoteData>({
    extensionId: Meta.extensionConfigs.uuid,
  });
  const { open } = useNativeContextMenu<{ id: string }>({
    items: [
      {
        id: 'open-widget',
        label: 'Open',
        click: (data) => {
          window.electron.ipcRenderer.invoke('create-widget', {
            id: data.id,
          });
        },
      },
      {
        id: 'delete',
        label: 'Delete',
        click: (data) => {
          window.electron.ipcRenderer.invoke('delete-user-extension-item', {
            id: data.id,
          });
        },
      },
    ],
  });

  return (
    <Flex direction='column' flex='1 1 auto'>
      <Flex>
        <Flex>
          <ActionIcon
            variant='subtle'
            aria-label='Settings'
            onClick={async () => {
              const entity = await window.electron.ipcRenderer.invoke<NoteData>(
                'create-user-extension-item',
                {
                  extensionId: Meta.extensionConfigs.uuid,
                  data: {
                    content: 'This is a new note',
                  },
                }
              );
              await window.electron.ipcRenderer.invoke('create-widget', {
                id: entity.id,
              });
            }}
          >
            <RiAddFill style={{ width: '70%', height: '70%' }} />
          </ActionIcon>
        </Flex>
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
      <Flex flex={1} direction='column' style={{ overflow: 'hidden' }}>
        <Flex pb='xs' pl='xs' pr='xs' direction='column'>
          <Text size='xl'>Notes</Text>
          <Input mt='sm' placeholder='Search...' />
        </Flex>
        <Divider />
        <ScrollArea flex={1} scrollbars='y' h='100%' pl='sm' pr='sm'>
          <Flex direction='column' gap='sm' pb='sm' pt='sm'>
            {contents.map((content) => (
              <Card
                key={content.id}
                shadow='sm'
                padding='sm'
                radius='md'
                withBorder
                onDoubleClick={async () => {
                  await window.electron.ipcRenderer.invoke('create-widget', {
                    id: content.id,
                  });
                }}
                style={{ userSelect: 'none' }}
              >
                <Flex justify='flex-end'>
                  <ActionIcon
                    variant='subtle'
                    aria-label='Settings'
                    size='sm'
                    onClick={async (e) => {
                      e.stopPropagation();
                      open({ id: content.id });
                    }}
                  >
                    <RiMoreFill style={{ width: '70%', height: '70%' }} />
                  </ActionIcon>
                </Flex>
                <Text size='sm'>{content.data.content}</Text>
              </Card>
            ))}
          </Flex>
        </ScrollArea>
      </Flex>
    </Flex>
  );
}
