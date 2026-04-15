import type { ComponentType } from 'react';

import type { AppKey } from './appHostConfig';
import { LOCAL_APP_OVERRIDE, TEMPLATE_APP_SEGMENT } from './appHostConfig';

type AppModule = {
  default: ComponentType<{ basename?: string }>;
};

export type AppSelection = {
  appKey: AppKey;
  basename: string;
};

const normalizeBaseName = (baseName?: string) => {
  if (!baseName || baseName === '/') {
    return '/';
  }

  return `/${baseName.replace(/^\/+|\/+$/g, '')}`;
};

const joinBaseName = (baseName: string, segment: string) => {
  const normalizedBaseName = normalizeBaseName(baseName);
  const normalizedSegment = `/${segment.replace(/^\/+|\/+$/g, '')}`;

  if (normalizedBaseName === '/') {
    return normalizedSegment;
  }

  return `${normalizedBaseName}${normalizedSegment}`;
};

const stripBaseName = (pathname: string, baseName: string) => {
  const normalizedBaseName = normalizeBaseName(baseName);

  if (normalizedBaseName === '/') {
    return pathname || '/';
  }

  if (pathname === normalizedBaseName) {
    return '/';
  }

  if (pathname.startsWith(`${normalizedBaseName}/`)) {
    return pathname.slice(normalizedBaseName.length) || '/';
  }

  return pathname || '/';
};

const isAppKey = (value: unknown): value is AppKey => {
  return value === 'main' || value === 'template';
};

const getAppOverride = (): AppKey | null => {
  if (isAppKey(LOCAL_APP_OVERRIDE)) {
    return LOCAL_APP_OVERRIDE;
  }

  const envOverride = import.meta.env.VITE_DEV_APP;

  return isAppKey(envOverride) ? envOverride : null;
};

const isTemplatePath = (pathname: string) => {
  return pathname === TEMPLATE_APP_SEGMENT || pathname.startsWith(`${TEMPLATE_APP_SEGMENT}/`);
};

export const resolveAppSelection = (
  pathname: string,
  defaultBaseName = import.meta.env.VITE_APP_BASE_NAME
): AppSelection => {
  const baseName = normalizeBaseName(defaultBaseName);
  const relativePathname = stripBaseName(pathname, baseName);
  const pathSelectsTemplate = isTemplatePath(relativePathname);
  const appOverride = getAppOverride();

  if (appOverride === 'template') {
    return {
      appKey: 'template',
      basename: pathSelectsTemplate ? joinBaseName(baseName, TEMPLATE_APP_SEGMENT) : baseName,
    };
  }

  if (appOverride === 'main') {
    return {
      appKey: 'main',
      basename: baseName,
    };
  }

  if (pathSelectsTemplate) {
    return {
      appKey: 'template',
      basename: joinBaseName(baseName, TEMPLATE_APP_SEGMENT),
    };
  }

  return {
    appKey: 'main',
    basename: baseName,
  };
};

export const loadSelectedApp = async (appKey: AppKey): Promise<AppModule> => {
  if (appKey === 'template') {
    return import('../template/App');
  }

  return import('../App');
};
