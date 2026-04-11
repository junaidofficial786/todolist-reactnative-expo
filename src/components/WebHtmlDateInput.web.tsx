import React from 'react';
import { View } from 'react-native';

import type { WebHtmlDateInputProps } from './WebHtmlDateInputProps';

function toYMD(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/**
 * HTML5 date input — @react-native-community/datetimepicker does not support web reliably.
 */
export function WebHtmlDateInput({
  value,
  onChange,
  borderColor,
  backgroundColor,
  color,
}: WebHtmlDateInputProps) {
  const str = value ? toYMD(value) : '';

  return (
    <View style={{ minWidth: 160, flex: 1, maxWidth: 220 }}>
      <input
        type="date"
        value={str}
        onChange={(e) => {
          const v = e.currentTarget.value;
          onChange(v ? new Date(`${v}T12:00:00`) : null);
        }}
        style={{
          width: '100%',
          padding: 10,
          borderRadius: 12,
          border: `1px solid ${borderColor}`,
          backgroundColor,
          color,
          fontSize: 16,
          boxSizing: 'border-box',
          cursor: 'pointer',
        }}
      />
    </View>
  );
}
