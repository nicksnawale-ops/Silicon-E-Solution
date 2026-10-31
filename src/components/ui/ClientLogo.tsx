import React from 'react';
import { ClientItem } from '../../types';

/**
 * Official client logo, sized per artwork so each reads at a similar visual weight:
 * wide wordmarks get width, the tall Symbiosis emblem gets height, and the
 * block logos (KIMSDU blue panel, Anibrain black tile) keep their rounded tile.
 */
const SIZE: Record<string, { lg: string; sm: string }> = {
  'symbiosis-hospital': { lg: 'max-h-[44px] max-w-[92%]', sm: 'max-h-[34px] max-w-full' },
  kimsdu: { lg: 'max-h-[82px] rounded-lg', sm: 'max-h-[54px] rounded-md' },
  yashodhara: { lg: 'max-h-[66px] max-w-[94%]', sm: 'max-h-[46px] max-w-full' },
  anibrain: { lg: 'max-h-[54px] rounded-lg', sm: 'max-h-[38px] rounded-md' },
  'symbiosis-international': { lg: 'max-h-[88px]', sm: 'max-h-[56px]' },
};

const keyOf = (logo: string) => logo.split('/').pop()?.replace(/\.\w+$/, '') ?? '';

export const ClientLogo: React.FC<{ client: ClientItem; size?: 'lg' | 'sm'; className?: string }> = ({
  client,
  size = 'lg',
  className = '',
}) => {
  if (!client.logo) return null;
  const s = SIZE[keyOf(client.logo)] ?? { lg: 'max-h-[64px]', sm: 'max-h-[44px]' };
  return (
    <img
      src={client.logo}
      alt={`${client.name} logo`}
      decoding="async"
      draggable={false}
      className={`w-auto max-w-full object-contain select-none ${s[size]} ${className}`}
    />
  );
};
