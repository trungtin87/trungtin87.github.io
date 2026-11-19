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

export type AstroTemplateStyle =
  | 'newyorker-light'
  | 'nytimes-light'
  | 'bbc-dark'
  | 'obsidian-broadsheet'
  | 'espresso-salon';

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
  pagesUrl: string;
  githubOwner: string;
  githubRepo: string;
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
  "authorBio": "Tác giả blog cá nhân chia sẻ bài viết, quan điểm và ghi chép dài hạn.",
  "themeMode": "dark",
  "templateStyle": "espresso-salon",
  "pagesUrl": "https://trungtin87.github.io",
  "githubOwner": "trungtin87",
  "githubRepo": "trungtin87.github.io",
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
