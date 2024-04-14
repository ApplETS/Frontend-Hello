import type { Meta, StoryObj } from '@storybook/react';
import CancelButton from '../components/CancelButton';
import { SettingsProvider } from '@/utils/provider/SettingsProvider';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/CancelButton',
  component: CancelButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <SettingsProvider>
        <div style={{ width: '300px', height: '100%' }}>
          <Story />
        </div>
      </SettingsProvider>
    ),
  ],
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof CancelButton>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    buttonText: 'Cancel',
    dialogText: {
      title: 'Cancel',
      message: 'Are you sure you want to cancel?',
      yes: 'Yes',
      no: 'No'
    }
  }
};