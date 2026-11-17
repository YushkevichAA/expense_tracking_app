import {
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { useOperationsActions } from "../store";
import { setTransaction } from "../services/server.service";
import type { TOperation } from "../shared/types";
import { formatDateFromDate } from "../shared";

const expenseCategories = ["Питание", "Транспорт", "Учёба", "Жильё", "Другое"];
const incomeCategories = ["Стипендия", "Подработка", "Подарок", "Другое"];

export const AddOperation = ({
  openModal,
  handleClose,
}: {
  openModal: boolean;
  handleClose: () => void;
}) => {
  const { addOperation } = useOperationsActions();
  const [form, setForm] = useState({
    date: formatDateFromDate(new Date()),
    type: "expense",
    category: "",
    comment: "",
    amount: "",
  });
  const categories =
    form.type === "income" ? incomeCategories : expenseCategories;

  const saveOperation = async () => {
    const amount = Number(form.amount);
    if (!amount || amount <= 0 || !form.category || !form.date) return;

    const createdOperation = await setTransaction({
      date: form.date,
      type: form.type as TOperation,
      category: form.category,
      comment: form.comment.trim(),
      amount: Number(form.amount),
    });

    addOperation(createdOperation.data);
    handleResetAndClose();
  };

  const handleResetAndClose = () => {
    setForm({
      date: formatDateFromDate(new Date()),
      type: "expense",
      category: "",
      comment: "",
      amount: "",
    });
    handleClose();
  };

  return (
    <Dialog open={openModal} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>Добавить операцию</DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ pt: 1 }}>
          <FormControl fullWidth>
            <InputLabel>Тип операции</InputLabel>
            <Select
              value={form.type}
              label="Тип операции"
              onChange={(event) =>
                setForm({
                  ...form,
                  type: event.target.value,
                  category: "",
                })
              }
            >
              <MenuItem value="expense">Расход</MenuItem>
              <MenuItem value="income">Доход</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Сумма, ₽"
            type="number"
            value={form.amount}
            onChange={(event) =>
              setForm({ ...form, amount: event.target.value })
            }
            slotProps={{
              htmlInput: {
                min: 1,
              },
            }}
            fullWidth
          />

          <TextField
            label="Дата"
            type="date"
            value={form.date}
            onChange={(event) => setForm({ ...form, date: event.target.value })}
            slotProps={{
              inputLabel: { shrink: true },
            }}
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel>Категория</InputLabel>
            <Select
              value={form.category}
              label="Категория"
              onChange={(event) =>
                setForm({ ...form, category: event.target.value })
              }
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Комментарий"
            value={form.comment}
            onChange={(event) =>
              setForm({ ...form, comment: event.target.value })
            }
            fullWidth
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleResetAndClose}>Отмена</Button>
        <Button variant="contained" onClick={saveOperation}>
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
};
