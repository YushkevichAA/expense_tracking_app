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
// import { useOperationsActions } from "../store";
import type { IOperation } from "../shared/types";
import { patchTransactionService } from "../services/server.service";
import { useOperationsActions } from "../store";

const expenseCategories = ["Питание", "Транспорт", "Учёба", "Жильё", "Другое"];
const incomeCategories = ["Стипендия", "Подработка", "Подарок", "Другое"];

export const UpdateOperation = ({
  operation,
  handleClose,
}: {
  operation: IOperation;
  handleClose: () => void;
}) => {
  const { updateOperation: updateOperationInStore } = useOperationsActions();
  const [form, setForm] = useState<IOperation>(operation);

  const categories =
    form?.type === "income" ? incomeCategories : expenseCategories;

  const saveOperation = async () => {
    if (!form) {
      return;
    }
    const amount = Number(form.amount);
    if (!amount || amount <= 0 || !form.category || !form.date) return;

    const request = await patchTransactionService(form);
    updateOperationInStore(request.data);
    handleClose();
  };

  return (
    <Dialog open={!!form} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>Добавить операцию</DialogTitle>

      {form && (
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
              name="amount"
              value={form.amount}
              onChange={(event) =>
                setForm({ ...form, amount: +event.target.value })
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
              name="date"
              value={form.date}
              onChange={(event) =>
                setForm({ ...form, date: event.target.value })
              }
              slotProps={{
                inputLabel: { shrink: true },
              }}
              fullWidth
            />

            <FormControl fullWidth>
              <InputLabel>Категория</InputLabel>
              <Select
                value={form.category}
                name="category"
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
              name="comment"
              onChange={(event) =>
                setForm({ ...form, comment: event.target.value })
              }
              fullWidth
            />
          </Stack>
        </DialogContent>
      )}

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose}>Отмена</Button>
        <Button variant="contained" onClick={saveOperation}>
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
};
