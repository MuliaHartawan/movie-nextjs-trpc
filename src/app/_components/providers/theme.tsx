"use client";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ThemeProvider, TThemeConfig } from "admiral";
import Link from "next/link";

const theme: TThemeConfig = {
  components: {
    Menu: {
      itemColor: "#FFFFFF",
      itemSelectedColor: "#FFFFFF",
      itemHoverBg: "#1d4ed8",
      itemHoverColor: "#B5F5EC",
      itemSelectedBg: "#1d4ed8",
      fontSize: 14,
      horizontalItemSelectedColor: "#08979C",
    },
    Layout: {
      headerColor: "#001213",
      headerBg: "#FFF",
    },
  },
  token: {
    colorPrimary: "#3b82f6",
    colorLink: "#006D75",
  },
  admiral: {
    Sidebar: {
      colorBg: "#3b82f6",
      colorText: "#FFFFFF",
    },
    Page: {
      NavigationAs: ({ path, label }) => <Link href={path}>{label}</Link>,
    },
  },
};

const AntDProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <AntdRegistry>{children}</AntdRegistry>
    </ThemeProvider>
  );
};

export default AntDProvider;
