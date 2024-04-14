import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import ImageCropper from '../components/ImageCropper';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/ImageCropper',
  component: ImageCropper,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { handleImageModalClose: fn(), handleImageModalConfirm: fn() },
} satisfies Meta<typeof ImageCropper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    imageSrc: 'https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg',
  },
};