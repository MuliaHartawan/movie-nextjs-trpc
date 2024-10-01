"use client";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ThemeProvider, TThemeConfig } from "admiral";
import Link from "next/link";

const theme: TThemeConfig = {
  components: {
    Menu: {
      itemColor: "#B5F5EC",
      itemSelectedColor: "#B5F5EC",
      itemHoverBg: "#08979C",
      itemHoverColor: "#B5F5EC",
      itemSelectedBg: "#08979C",
      fontSize: 14,
      horizontalItemSelectedColor: "#08979C",
    },
    Layout: {
      headerColor: "#001213",
      headerBg: "#FFF",
    },
  },
  token: {
    colorPrimary: "#006D75",
    colorLink: "#006D75",
  },
  admiral: {
    Sidebar: {
      colorBg: "#006D75",
      colorText: "#B5F5EC",
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
