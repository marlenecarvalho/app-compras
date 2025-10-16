// components/CategoryPicker.tsx
import React, { useState } from 'react';
import { View, Text, Pressable, Modal, FlatList, StyleSheet } from 'react-native';
import type { Category } from '../src/types';
import { useTheme } from '../src/theme/ThemeProvider';

type Props = {
  categories: Category[];
  selected?: string;
  onSelect: (id: string) => void;
  width?: number; // opcional: permite travar largura (ex.: 300)
};

export default function CategoryPicker({ categories, selected, onSelect, width }: Props) {
  const t = useTheme();
  const [open, setOpen] = useState(false);
  const cat = categories.find((c) => c.id === selected);

function openModal() {
    setOpen(true);
    
}
  return (
    <View style={{ position: 'relative', width: width ?? '100%' }}>
      {/* Botão (fechado) */}
      <Pressable
        onPress={() => setOpen(true)}
        style={[
          styles.input,
          {
            height: 44,
            borderColor: t.colors.violet,
            backgroundColor: t.colors.overlay,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 12,
          },
        ]}
      >
        <Text style={{ color: cat ? t.colors.text : t.colors.textMuted }}>
          {cat ? cat.nome : 'Selecione'}
        </Text>
        <Text style={{ color: t.colors.text }}>⌄</Text>
      </Pressable>

      {/* Dropdown */}
      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        {/* backdrop */}
        <Pressable style={StyleSheet.absoluteFill} onPress={() => setOpen(false)} />
        <View
          style={[
            styles.dropdown,
            {
              borderColor: t.colors.border,
              backgroundColor: 'rgba(24,24,27,0.92)',
              width: width ?? 300,
            },
          ]}
        >
          <FlatList
            data={categories}
            keyExtractor={(c) => c.id}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  onSelect(item.id);
                  setOpen(false);
                }}
                style={styles.option}
              >
                <View
                  style={{
                    width: 24,
                    height: 24,
                    borderWidth: 1,
                    borderRadius: 6,
                    borderColor: item.cor || t.colors.border,
                    backgroundColor: `${(item.cor || t.colors.border)}22`,
                    marginRight: 10,
                  }}
                />
                <Text style={{ color: '#e5e7eb', fontSize: 14 }}>{item.nome}</Text>
              </Pressable>
            )}
            ItemSeparatorComponent={() => (
              <View style={{ height: 1, backgroundColor: t.colors.border, opacity: 0.35 }} />
            )}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  input: { borderWidth: 1, borderRadius: 12 },
  dropdown: {
    position: 'absolute',
    right: 0,
    top: 48,
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
    maxHeight: 320,
  },
  option: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
