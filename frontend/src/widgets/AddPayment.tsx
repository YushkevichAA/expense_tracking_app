import { useState } from "react";
import type { FormEvent } from "react";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  MenuItem,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

type OperationType = "INCOME" | "EXPENSE";

export interface OperationFormData {
  type: OperationType;
  amount: string;
  operationDate: string;
  categoryId: string;
  comment: string;
}

export interface OperationCategory {
  id: string;
  name: string;
  type: OperationType;
}

interface OperationDialogProps {
  open: boolean;
  categories: OperationCategory[];
  onClose: () => void;
  onSubmit: (data: OperationFormData) => Promise<void> | void;
}

function getLocalDate() {
  const today = new Date();

  return [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");
}

const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "5px",
    backgroundColor: "#fff",
    fontSize: 13,
    "& fieldset": {
      borderColor: "#e3e9f2",
    },
  },
  "& .MuiInputBase-input": {
    padding: "10px 12px",
  },
  "& .MuiFormHelperText-root": {
    marginLeft: 0,
    fontSize: 11,
  },
};

const labelSx = {
  display: "block",
  mb: 0.6,
  color: "#71809b",
  fontSize: 11,
};

export function AddPayment({
  open,
  categories,
  onClose,
  onSubmit,
}: OperationDialogProps) {
  const [form, setForm] = useState<OperationFormData>({
    type: "INCOME",
    amount: "",
    operationDate: getLocalDate(),
    categoryId: "",
    comment: "",
  });

  const [attempted, setAttempted] = useState(false);
  const [amountTouched, setAmountTouched] = useState(false);
  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] = useState("");

  const availableCategories = categories.filter(
    (category) => category.type === form.type,
  );

  const normalizedAmount = form.amount.trim().replace(",", ".");

  // Положительная сумма, не более двух знаков после запятой.
  const amountValid =
    /^\d+(?:\.\d{1,2})?$/.test(normalizedAmount) &&
    Number.isFinite(Number(normalizedAmount)) &&
    Number(normalizedAmount) > 0;

  const categoryValid = availableCategories.some(
    (category) => category.id === form.categoryId,
  );

  const amountError = (attempted || amountTouched) && !amountValid;

  function updateField<K extends keyof OperationFormData>(
    field: K,
    value: OperationFormData[K],
  ) {
    setForm((current) => ({ ...current, [field]: value }));
    setServerError("");
  }

  function handleClose() {
    if (!saving) onClose();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving) return;

    setAttempted(true);
    setServerError("");

    if (!amountValid || !form.operationDate || !categoryValid) return;

    // Формируем десятичную строку без вычислений с дробными числами.
    const [whole, fraction = ""] = normalizedAmount.split(".");
    const amount = `${whole.replace(/^0+(?=\d)/, "")}.${fraction.padEnd(2, "0")}`;

    setSaving(true);

    try {
      await onSubmit({
        ...form,
        amount,
        comment: form.comment.trim(),
      });

      onClose();
    } catch (error) {
      setServerError(
        error instanceof Error
          ? error.message
          : "Не удалось сохранить операцию. Попробуйте ещё раз.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
      aria-labelledby="operation-dialog-title"
      slotProps={{
        backdrop: {
          sx: { backgroundColor: "rgba(36, 52, 79, 0.36)" },
        },
        paper: {
          sx: {
            width: 380,
            maxWidth: "calc(100% - 24px)",
            m: 1.5,
            borderRadius: "10px",
            boxShadow: "0 16px 48px rgba(23, 43, 77, 0.15)",
          },
        },
      }}
    >
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 3,
            pt: 2,
            pb: 1.5,
          }}
        >
          <Typography
            id="operation-dialog-title"
            component="h2"
            sx={{
              color: "#172b4d",
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            Добавить операцию
          </Typography>

          <IconButton
            onClick={handleClose}
            disabled={saving}
            aria-label="Закрыть"
            size="small"
            sx={{ color: "#71809b", mr: -0.5 }}
          >
            <CloseRoundedIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>

        <DialogContent sx={{ px: 3, pt: 0, pb: 2 }}>
          <Box sx={{ mb: 2 }}>
            <Typography id="operation-type-label" sx={labelSx}>
              Тип операции
            </Typography>

            <ToggleButtonGroup
              value={form.type}
              exclusive
              fullWidth
              disabled={saving}
              aria-labelledby="operation-type-label"
              onChange={(_, value: OperationType | null) => {
                if (!value) return;

                setForm((current) => ({
                  ...current,
                  type: value,
                  categoryId: "",
                }));
                setServerError("");
              }}
              sx={{
                p: "3px",
                borderRadius: "5px",
                backgroundColor: "#f4f6fa",
                "& .MuiToggleButtonGroup-grouped": {
                  m: 0,
                  border: 0,
                  borderRadius: "4px !important",
                  py: 0.6,
                  fontSize: 12,
                  textTransform: "none",
                  color: "#71809b",
                  "&.Mui-selected": {
                    color: "#1976d2",
                    backgroundColor: "#fff",
                    boxShadow: "0 1px 4px rgba(23, 43, 77, 0.04)",
                    "&:hover": {
                      backgroundColor: "#fff",
                    },
                  },
                },
              }}
            >
              <ToggleButton value="INCOME">Доход</ToggleButton>
              <ToggleButton value="EXPENSE">Расход</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography
              component="label"
              htmlFor="operation-amount"
              sx={labelSx}
            >
              Сумма в рублях
            </Typography>

            <TextField
              id="operation-amount"
              value={form.amount}
              onChange={(event) => updateField("amount", event.target.value)}
              onBlur={() => setAmountTouched(true)}
              placeholder="Введите сумму"
              disabled={saving}
              error={amountError}
              helperText={
                amountError
                  ? "Укажите сумму больше 0, не более двух знаков после запятой"
                  : undefined
              }
              slotProps={{
                htmlInput: { inputMode: "decimal" },
              }}
              fullWidth
              size="small"
              sx={inputSx}
            />
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 2,
              mb: 2,
            }}
          >
            <Box>
              <Typography
                component="label"
                htmlFor="operation-date"
                sx={labelSx}
              >
                Дата
              </Typography>

              <TextField
                id="operation-date"
                type="date"
                value={form.operationDate}
                onChange={(event) =>
                  updateField("operationDate", event.target.value)
                }
                disabled={saving}
                error={attempted && !form.operationDate}
                helperText={
                  attempted && !form.operationDate ? "Укажите дату" : undefined
                }
                fullWidth
                size="small"
                sx={inputSx}
              />
            </Box>

            <Box>
              <Typography id="operation-category-label" sx={labelSx}>
                Категория
              </Typography>

              <TextField
                select
                value={form.categoryId}
                onChange={(event) =>
                  updateField("categoryId", event.target.value)
                }
                disabled={saving}
                error={attempted && !categoryValid}
                helperText={
                  attempted && !categoryValid ? "Выберите категорию" : undefined
                }
                slotProps={{
                  select: {
                    displayEmpty: true,
                    labelId: "operation-category-label",
                  },
                }}
                fullWidth
                size="small"
                sx={inputSx}
              >
                <MenuItem value="" disabled>
                  Выберите
                </MenuItem>

                {availableCategories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Box>

          <Box>
            <Typography
              component="label"
              htmlFor="operation-comment"
              sx={labelSx}
            >
              Комментарий
            </Typography>

            <TextField
              id="operation-comment"
              value={form.comment}
              onChange={(event) => updateField("comment", event.target.value)}
              placeholder="Например, кофе и перекус"
              disabled={saving}
              fullWidth
              size="small"
              sx={inputSx}
            />
          </Box>

          {serverError && (
            <Alert severity="error" sx={{ mt: 2, fontSize: 12 }}>
              {serverError}
            </Alert>
          )}

          <Divider sx={{ mt: 3, mb: 1.5, borderColor: "#edf0f5" }} />

          <Typography sx={{ color: "#71809b", fontSize: 10 }}>
            Данные сохраняются только в этом учебном MVP
          </Typography>
        </DialogContent>

        <DialogActions sx={{ px: 3, pt: 0, pb: 2, gap: 1 }}>
          <Button
            onClick={handleClose}
            disabled={saving}
            sx={{ textTransform: "none", fontSize: 12 }}
          >
            Отмена
          </Button>

          <Button
            type="submit"
            variant="contained"
            disabled={saving}
            disableElevation
            sx={{
              borderRadius: "5px",
              textTransform: "none",
              fontSize: 12,
              px: 2,
            }}
          >
            {saving ? "Сохранение…" : "Сохранить"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
