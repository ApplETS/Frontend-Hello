import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import ETSImage from '../components/ETSImage';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/ETSImage',
  component: ETSImage,
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
  args: {},
} satisfies Meta<typeof ETSImage>;

export default meta;

type Story = StoryObj<typeof meta>;
export const English: Story = {
  args: {
    lang: 'en',
    isLightTheme: true,
  }
};

export const French: Story = {
  args: {
    lang: 'fr',
    isLightTheme: true,
  }
};

export const Light: Story = {
  args: {
    lang: 'en',
    isLightTheme: true,
  }
};

export const Dark: Story = {
  args: {
    lang: 'en',
    isLightTheme: false,
  }
};