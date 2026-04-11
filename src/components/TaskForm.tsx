import React, { useEffect, useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Pressable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

import { Button } from '@/components/Button';
import { useTheme } from '@/context/ThemeContext';
import type { CategoryId, TaskDraft } from '@/context/types';
import { CATEGORY_LABELS, CATEGORY_ORDER } from '@/utils/categories';
import { formatDueDate } from '@/utils/dateFormat';

type Props = {
  initial: TaskDraft;
  submitLabel: string;
  onSubmit: (draft: TaskDraft) => void;
};

export function TaskForm({ initial, submitLabel, onSubmit }: Props) {
  const { theme } = useTheme();
  const [title, setTitle] = useState(initial.title);
  const [description, setDescription] = useState(initial.description);
  const [category, setCategory] = useState<CategoryId>(initial.category);
  const [dueDate, setDueDate] = useState<Date | null>(initial.dueDate);
  const [showPicker, setShowPicker] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setTitle(initial.title);
    setDescription(initial.description);
    setCategory(initial.category);
    setDueDate(initial.dueDate);
  }, [initial]);

  const dueLabel = useMemo(() => formatDueDate(dueDate ? dueDate.toISOString() : null), [dueDate]);

  const handleSubmit = () => {
    if (!title.trim()) {
      setError('Add a title to continue.');
      return;
    }
    setError(null);
    onSubmit({
      title,
      description,
      category,
      dueDate,
    });
  };

  const onChangeDate = (event: DateTimePickerEvent, selected?: Date) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
    if (event.type === 'dismissed') {
      return;
    }
    if (selected) {
      setDueDate(selected);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={88}
    >
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: theme.spacing.lg,
          paddingTop: theme.spacing.md,
          paddingBottom: theme.spacing.xxxl,
        }}
        keyboardShouldPersistTaps="handled"
      >
        {error ? (
          <Text
            style={{
              color: theme.colors.accent,
              fontSize: theme.typography.sizes.sm,
              marginBottom: theme.spacing.sm,
            }}
          >
            {error}
          </Text>
        ) : null}

        <Text
          style={{
            color: theme.colors.textSecondary,
            fontSize: theme.typography.sizes.xs,
            fontWeight: theme.typography.weights.semibold,
            marginBottom: theme.spacing.xs,
          }}
        >
          TITLE
        </Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="What needs to be done?"
          placeholderTextColor={theme.colors.placeholder}
          style={[
            styles.input,
            {
              color: theme.colors.textPrimary,
              backgroundColor: theme.colors.inputBackground,
              borderColor: theme.colors.border,
              borderRadius: theme.radii.md,
              padding: theme.spacing.md,
              fontSize: theme.typography.sizes.md,
            },
          ]}
        />

        <Text
          style={{
            color: theme.colors.textSecondary,
            fontSize: theme.typography.sizes.xs,
            fontWeight: theme.typography.weights.semibold,
            marginTop: theme.spacing.lg,
            marginBottom: theme.spacing.xs,
          }}
        >
          DESCRIPTION (OPTIONAL)
        </Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Notes, links, or subtasks…"
          placeholderTextColor={theme.colors.placeholder}
          multiline
          textAlignVertical="top"
          style={[
            styles.input,
            styles.textArea,
            {
              color: theme.colors.textPrimary,
              backgroundColor: theme.colors.inputBackground,
              borderColor: theme.colors.border,
              borderRadius: theme.radii.md,
              padding: theme.spacing.md,
              fontSize: theme.typography.sizes.md,
              minHeight: 120,
            },
          ]}
        />

        <Text
          style={{
            color: theme.colors.textSecondary,
            fontSize: theme.typography.sizes.xs,
            fontWeight: theme.typography.weights.semibold,
            marginTop: theme.spacing.lg,
            marginBottom: theme.spacing.sm,
          }}
        >
          CATEGORY
        </Text>
        <View style={styles.catRow}>
          {CATEGORY_ORDER.map((c) => {
            const active = category === c;
            return (
              <Pressable
                key={c}
                onPress={() => setCategory(c)}
                style={[
                  styles.catChip,
                  {
                    paddingVertical: theme.spacing.sm,
                    paddingHorizontal: theme.spacing.md,
                    borderRadius: theme.radii.full,
                    marginRight: theme.spacing.xs,
                    marginBottom: theme.spacing.xs,
                    backgroundColor: active ? theme.colors.textPrimary : theme.colors.chipBackground,
                  },
                ]}
              >
                <Text
                  style={{
                    color: active ? theme.colors.fabIcon : theme.colors.textSecondary,
                    fontSize: theme.typography.sizes.sm,
                    fontWeight: theme.typography.weights.semibold,
                  }}
                >
                  {CATEGORY_LABELS[c]}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Text
          style={{
            color: theme.colors.textSecondary,
            fontSize: theme.typography.sizes.xs,
            fontWeight: theme.typography.weights.semibold,
            marginTop: theme.spacing.md,
            marginBottom: theme.spacing.sm,
          }}
        >
          DUE DATE
        </Text>
        <View
          style={[
            styles.dateCard,
            {
              backgroundColor: theme.colors.surface,
              borderRadius: theme.radii.lg,
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: theme.colors.border,
              padding: theme.spacing.md,
            },
          ]}
        >
          <View style={styles.dateRow}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: theme.colors.textMuted, fontSize: theme.typography.sizes.xs }}>
                Scheduled for
              </Text>
              <Text
                style={{
                  color: dueDate ? theme.colors.textPrimary : theme.colors.textMuted,
                  fontSize: theme.typography.sizes.md,
                  fontWeight: theme.typography.weights.medium,
                  marginTop: theme.spacing.xxs,
                }}
              >
                {dueDate ? dueLabel : 'No date'}
              </Text>
            </View>
            <Pressable
              onPress={() => setShowPicker((v) => !v)}
              style={[
                styles.iconBtn,
                {
                  backgroundColor: theme.colors.chipBackground,
                  borderRadius: theme.radii.md,
                  width: 44,
                  height: 44,
                },
              ]}
            >
              <Ionicons name="calendar-outline" size={22} color={theme.colors.textPrimary} />
            </Pressable>
          </View>
          {dueDate ? (
            <Pressable onPress={() => setDueDate(null)} style={{ marginTop: theme.spacing.sm }}>
              <Text style={{ color: theme.colors.accent, fontSize: theme.typography.sizes.sm }}>Clear date</Text>
            </Pressable>
          ) : null}
          {showPicker ? (
            <>
              <DateTimePicker
                value={dueDate ?? new Date()}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={onChangeDate}
                themeVariant={theme.mode === 'dark' ? 'dark' : 'light'}
              />
              {Platform.OS === 'ios' ? (
                <Pressable
                  onPress={() => setShowPicker(false)}
                  style={{ alignSelf: 'flex-end', marginTop: theme.spacing.sm }}
                >
                  <Text style={{ color: theme.colors.textPrimary, fontWeight: theme.typography.weights.semibold }}>
                    Done
                  </Text>
                </Pressable>
              ) : null}
            </>
          ) : null}
        </View>

        <View style={{ marginTop: theme.spacing.xl }}>
          <Button label={submitLabel} onPress={handleSubmit} variant="primary" />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
  },
  textArea: {},
  catRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  catChip: {},
  dateCard: {},
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
