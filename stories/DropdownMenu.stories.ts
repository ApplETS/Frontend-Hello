import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import DropdownMenu, { MenuItem } from '../components/DropdownMenu';
import { faClone, faTrashCan, faPencil } from '@fortawesome/free-solid-svg-icons';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onSelect: fn() },
} satisfies Meta<typeof DropdownMenu>;

export default meta;
var items : MenuItem[] = [
  {
    id: 1,
    text: 'modify',
    icon: faPencil,
    color: '',
  },
  {
    id: 2,
    text: 'duplicate',
    icon: faClone,
    color: '',
  },
  {
    id: 3,
    text: 'delete',
    icon: faTrashCan,
    color: 'text-error',
  },
];
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    itemIndex: 1,
    items: items
  }
};