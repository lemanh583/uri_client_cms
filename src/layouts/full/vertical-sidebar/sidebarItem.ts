import {
    ApertureIcon,
    CopyIcon,
    LayoutDashboardIcon, LoginIcon, MoodHappyIcon, TypographyIcon,
    UserPlusIcon, BoxMultiple0Icon, BoxMultiple1Icon, BoxMultiple2Icon, BoxMultiple3Icon,
    BoxMultiple4Icon, BoxMultiple5Icon
} from 'vue-tabler-icons';

export interface menu {
    header?: string;
    title?: string;
    icon?: any;
    to?: string;
    chip?: string;
    chipColor?: string;
    chipVariant?: string;
    chipIcon?: string;
    children?: menu[];
    disabled?: boolean;
    type?: string;
    subCaption?: string;
}

const sidebarItem: menu[] = [
    { header: 'Home' },
    {
        title: 'Tạo bài viết',
        icon: BoxMultiple0Icon,
        to: '/create-post'
    },
    {
        title: 'Danh sách bài viết',
        icon: BoxMultiple1Icon,
        to: '/list-post'
    },
    {
        title: 'Thể loại',
        icon: BoxMultiple2Icon,
        to: '/category'
    },
    {
        title: 'Danh sách liên hệ',
        icon: BoxMultiple3Icon,
        to: '/contacts'
    },
    {
        title: 'DS chủ đề (Hình ảnh)',
        icon: BoxMultiple4Icon,
        to: '/topics'
    },
    {
        title: 'Danh sách slide',
        icon: BoxMultiple5Icon,
        to: '/slides'
    },
    // {
    //     title: 'Dashboard',
    //     icon: LayoutDashboardIcon,
    //     to: '/'
    // },
    // { header: 'utilities' },
    // {
    //     title: 'Typography',
    //     icon: TypographyIcon,
    //     to: '/ui/typography'
    // },
    // {
    //     title: 'Shadow',
    //     icon: CopyIcon,
    //     to: '/ui/shadow'
    // },
    // { header: 'auth' },
    // {
    //     title: 'Login',
    //     icon: LoginIcon,
    //     to: '/auth/login'
    // },
    // {
    //     title: 'Register',
    //     icon: UserPlusIcon,
    //     to: '/auth/register'
    // },
    // { header: 'Extra' },
    // {
    //     title: 'Icons',
    //     icon: MoodHappyIcon,
    //     to: '/icons'
    // },
    // {
    //     title: 'Sample Page',
    //     icon: ApertureIcon,
    //     to: '/sample-page'
    // },
];

export default sidebarItem;
