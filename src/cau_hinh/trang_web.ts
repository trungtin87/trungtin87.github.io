export interface SiteLink {
  label: string;
  url: string;
}

export interface LiveChatChannel {
  id: 'messenger' | 'zalo' | 'telegram' | 'whatsapp' | 'tawkto' | 'crisp' | 'email';
  enabled: boolean;
  value: string;
  label?: string;
}

export interface LiveChatSettings {
  enabled: boolean;
  title?: string;
  welcomeText?: string;
  channels: LiveChatChannel[];
}

export interface GiscusSettings {
  enabled: boolean;
  repo: string;
  repoId: string;
  category: string;
  categoryId: string;
}

export type AstroTemplateStyle =
  | 'newyorker-light'
  | 'nytimes-light'
  | 'bbc-dark'
  | 'obsidian-broadsheet'
  | 'espresso-salon'
  | 'monocle-magazine'
  | 'guardian-portal'
  | 'kyoto-folio'
  | 'economist-digest'
  | 'nordic-atlas';

export interface ThemeModeColorOverrides {
  canvas?: string;
  surface?: string;
  textPrimary?: string;
  accent?: string;
  link?: string;
}

export interface ThemeCustomColors {
  light?: ThemeModeColorOverrides;
  dark?: ThemeModeColorOverrides;
}

export interface SiteIdentityConfig {
  siteTitle: string;
  tagline: string;
  siteIcon: string;
  headerTitle: string;
  headerNavLinks: SiteLink[];
  footerText: string;
  footerLinks: SiteLink[];
  authorName: string;
  authorBio: string;
  themeMode: 'light' | 'dark';
  templateStyle: AstroTemplateStyle;
  themeColors?: ThemeCustomColors;
  isMultiPage: boolean;
  pagesUrl: string;
  customDomain?: string;
  analyticsProvider?: 'none' | 'ga4' | 'cloudflare' | 'plausible' | 'umami';
  analyticsId?: string;
  giscus?: GiscusSettings;
  liveChat?: LiveChatSettings;
}

export const SITE_CONFIG: SiteIdentityConfig = {
  "siteTitle": "Bùi Gia Trang",
  "tagline": "Tìm hiểu sự Huyền diệu của cái Không",
  "siteIcon": "/favicon.png",
  "headerTitle": "Huyền Không Thư Quán",
  "headerNavLinks": [],
  "footerText": "@2026 HUYỀN KHÔNG THƯ QUÁN",
  "footerLinks": [],
  "authorName": "Huyền Không",
  "authorBio": "Tác giả blog cá nhân chia sẻ ghi chép thực chiến, tiểu luận và góc nhìn dài hạn.",
  "themeMode": "light",
  "templateStyle": "monocle-magazine",
  "themeColors": {
    "light": {
      "canvas": "#F7FAF8",
      "surface": "#EAF2ED",
      "textPrimary": "#122119",
      "accent": "#14532D",
      "link": "#15803D"
    },
    "dark": {
      "canvas": "#0E1512",
      "surface": "#16211C",
      "textPrimary": "#ECFDF5",
      "accent": "#34D399",
      "link": "#6EE7B7"
    }
  },
  "isMultiPage": true,
  "pagesUrl": "https://trungtin87.github.io",
  "customDomain": "",
  "analyticsProvider": "none",
  "analyticsId": "",
  "giscus": {
    "enabled": false,
    "repo": "",
    "repoId": "",
    "category": "Announcements",
    "categoryId": ""
  },
  "liveChat": {
    "enabled": false,
    "title": "Trò chuyện với tác giả",
    "welcomeText": "Chọn kênh liên hệ trực tiếp bên dưới để nhắn tin nhanh.",
    "channels": [
      {
        "id": "zalo",
        "enabled": false,
        "value": "",
        "label": "Zalo"
      },
      {
        "id": "messenger",
        "enabled": false,
        "value": "",
        "label": "Messenger"
      },
      {
        "id": "telegram",
        "enabled": false,
        "value": "",
        "label": "Telegram"
      },
      {
        "id": "whatsapp",
        "enabled": false,
        "value": "",
        "label": "WhatsApp"
      },
      {
        "id": "email",
        "enabled": false,
        "value": "",
        "label": "Email"
      },
      {
        "id": "tawkto",
        "enabled": false,
        "value": "",
        "label": "Tawk.to Widget"
      },
      {
        "id": "crisp",
        "enabled": false,
        "value": "",
        "label": "Crisp Chat"
      }
    ]
  }
};
