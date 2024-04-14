import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Avatar from '../components/Avatar';
import UserProvider from '@/utils/provider/UserProvider';
import { User } from '@/models/user';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [	
    (Story) => (	
      <UserProvider>
        <Story />	
      </UserProvider>	
    ),
  ],
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;
export const None: Story = {
  args: {
    size: undefined,
    color: undefined,
    textSize: undefined,
    userProfile: null
  }
};

const user: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@email.com',
  type: 'organizer',
  organization: 'ETS',
  activityAreaId: null,
  activityArea: null,
  avatarUrl: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
  profileDescription: 'I am a user',
  isActive: true,
  hasLoggedIn: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  facebookLink: null,
  instagramLink: null,
  tikTokLink: null,
  xLink: null,
  discordLink: null,
  linkedInLink: null,
  redditLink: null,
  webSiteLink: null
}

export const UserDefined: Story = {
  args: {
    size: 'w-20 h-20',
    color: undefined,
    textSize: undefined,
    userProfile: user
  }
};

const user2: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@email.com',
  type: 'organizer',
  organization: 'École de Technologie Supérieure',
  activityAreaId: null,
  activityArea: null,
  avatarUrl: null,
  profileDescription: 'I am a user',
  isActive: true,
  hasLoggedIn: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  facebookLink: null,
  instagramLink: null,
  tikTokLink: null,
  xLink: null,
  discordLink: null,
  linkedInLink: null,
  redditLink: null,
  webSiteLink: null
};


export const UserDefinedNoImage: Story = {
  args: {
    size: 'w-20 h-20',
    color: undefined,
    textSize: undefined,
    userProfile: user2
  }
};