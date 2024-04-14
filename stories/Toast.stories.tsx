import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Toast from '../components/Toast';
import { AlertType } from '@/components/Alert'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', width: '500px', height: '100%' }}>
        <Story />
      </div>
    ),
  ],
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onCloseToast: fn(() => {}) },
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    message: 'This is a toast message',
    alertType: AlertType.info,
  }
};

export const Success: Story = {
  args: {
    message: 'This is a toast message',
    alertType: AlertType.success,
  }
};

export const Warning: Story = {
  args: {
    message: 'This is a toast message',
    alertType: AlertType.warning,
  }
};

export const Error: Story = {
  args: {
    message: 'This is a toast message',
    alertType: AlertType.error,
  }
};
