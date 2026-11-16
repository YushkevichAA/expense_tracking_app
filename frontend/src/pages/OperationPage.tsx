import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import {
  AddRounded,
  MoreHorizRounded,
  ReceiptLongOutlined,
} from "@mui/icons-material";
import { formatDate, formatMoney } from "../shared";

interface IOperation {
  id: string;
  date: string;
  type: "expense" | "income";
  category: string;
  comment: string;
  amount: number;
}

const initialOperations: IOperation[] = [
  {
    id: "1",
    date: "2026-11-12",
    type: "expense",
    category: "Питание",
    comment: "Кофе и перекус",
    amount: 320,
  },
  {
    id: "2",
    date: "2026-11-10",
    type: "income",
    category: "Стипендия",
    comment: "За ноябрь",
    amount: 18000,
  },
  {
    id: "3",
    date: "2026-11-08",
    type: "expense",
    category: "Транспорт",
    comment: "Проездной",
    amount: 2450,
  },
];

const expenseCategories = ["Питание", "Транспорт", "Учёба", "Жильё", "Другое"];
const incomeCategories = ["Стипендия", "Подработка", "Подарок", "Другое"];

export function OperationsPage() {
  const [operations, setOperations] = useState(initialOperations);

  const [period, setPeriod] = useState("2026-11");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingOperation, setEditingOperation] = useState<IOperation | null>(
    null,
  );

  const [menuAnchor, setMenuAnchor] = useState<HTMLButtonElement | null>(null);
  const [menuOperation, setMenuOperation] = useState<IOperation | null>(null);

  const [form, setForm] = useState({
    date: "2026-11-16",
    type: "expense",
    category: "",
    comment: "",
    amount: "",
  });

  const filteredOperations = useMemo(
    () =>
      operations.filter((operation) => {
        const matchesPeriod =
          period === "all" || operation.date.startsWith(period);
        const matchesType =
          typeFilter === "all" || operation.type === typeFilter;
        const matchesCategory =
          categoryFilter === "all" || operation.category === categoryFilter;

        return matchesPeriod && matchesType && matchesCategory;
      }),
    [operations, period, typeFilter, categoryFilter],
  );

  const categories =
    form.type === "income" ? incomeCategories : expenseCategories;

  const openAddDialog = () => {
    setEditingOperation(null);
    setForm({
      date: "2026-11-16",
      type: "expense",
      category: "",
      comment: "",
      amount: "",
    });
    setDialogOpen(true);
  };

  const openEditDialog = (operation: IOperation | null) => {
    if (!operation) return;
    setEditingOperation(operation);
    setForm({
      date: operation.date,
      type: operation.type,
      category: operation.category,
      comment: operation.comment,
      amount: String(operation.amount),
    });
    setMenuAnchor(null);
    setDialogOpen(true);
  };

  const saveOperation = () => {
    const amount = Number(form.amount);
    if (!amount || amount <= 0 || !form.category || !form.date) return;
    // прикрутить сюда сохранение операции на сервере

    // const operationData = {
    //   date: form.date,
    //   type: form.type,
    //   category: form.category,
    //   comment: form.comment.trim() || "Без комментария",
    //   amount,
    // };

    // if (editingOperation) {
    //   setOperations((current) =>
    //     current.map((operation) =>
    //       operation.id === editingOperation.id
    //         ? { ...operation, ...operationData }
    //         : operation,
    //     ),
    //   );
    // } else {
    //   setOperations((current) => [
    //     { id: Date.now(), ...operationData },
    //     ...current,
    //   ]);
    // }

    setDialogOpen(false);
  };

  const deleteOperation = () => {
    if (!menuOperation) return;

    setOperations((current) =>
      current.filter((operation) => operation.id !== menuOperation.id),
    );

    setMenuAnchor(null);
    setMenuOperation(null);
  };

  const resetFilters = () => {
    setPeriod("all");
    setTypeFilter("all");
    setCategoryFilter("all");
  };

  return (
    <>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <Box component="main" sx={{ flexGrow: 1, minWidth: 0 }}>
          <Box sx={{ px: { xs: 2, md: 3.5 }, py: 2.5 }}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              sx={{
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", sm: "center" },
                gap: 1.5,
              }}
            >
              <Box>
                <Typography sx={{ fontSize: 20, fontWeight: 700 }}>
                  Операции
                </Typography>
                <Typography sx={{ color: "text.secondary", fontSize: 10 }}>
                  Ручной учёт доходов и расходов
                </Typography>
              </Box>

              <Button
                variant="contained"
                startIcon={<AddRounded />}
                onClick={openAddDialog}
                sx={{ fontSize: 10 }}
              >
                Добавить операцию
              </Button>
            </Stack>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              sx={{
                alignItems: { xs: "stretch", sm: "flex-end" },
                gap: 1.75,
                mt: 2.5,
                mb: 3,
              }}
            >
              <FormControl size="small" sx={{ minWidth: 132 }}>
                <InputLabel>Период</InputLabel>
                <Select
                  value={period}
                  label="Период"
                  onChange={(event) => setPeriod(event.target.value)}
                >
                  <MenuItem value="2026-11">Ноябрь 2026</MenuItem>
                  <MenuItem value="2026-10">Октябрь 2026</MenuItem>
                  <MenuItem value="all">За всё время</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 132 }}>
                <InputLabel>Тип операции</InputLabel>
                <Select
                  value={typeFilter}
                  label="Тип операции"
                  onChange={(event) => setTypeFilter(event.target.value)}
                >
                  <MenuItem value="all">Все типы</MenuItem>
                  <MenuItem value="income">Доход</MenuItem>
                  <MenuItem value="expense">Расход</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 132 }}>
                <InputLabel>Категория</InputLabel>
                <Select
                  value={categoryFilter}
                  label="Категория"
                  onChange={(event) => setCategoryFilter(event.target.value)}
                >
                  <MenuItem value="all">Все категории</MenuItem>
                  {[...new Set(operations.map((item) => item.category))].map(
                    (category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ),
                  )}
                </Select>
              </FormControl>

              <Button
                onClick={resetFilters}
                sx={{ ml: { sm: "auto" }, fontSize: 11 }}
              >
                Сбросить
              </Button>
            </Stack>

            <TableContainer sx={{ overflowX: "auto" }}>
              <Table size="small" aria-label="Операции">
                <TableHead>
                  <TableRow>
                    {[
                      "Дата",
                      "Тип",
                      "Категория",
                      "Комментарий",
                      "Сумма",
                      "Действие",
                    ].map((heading) => (
                      <TableCell
                        key={heading}
                        sx={{
                          color: "text.secondary",
                          fontSize: 9,
                          py: 1.25,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {heading}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {filteredOperations.map((operation) => {
                    const isIncome = operation.type === "income";

                    return (
                      <TableRow key={operation.id} hover>
                        <TableCell sx={{ fontSize: 10, whiteSpace: "nowrap" }}>
                          {formatDate(operation.date)}
                        </TableCell>

                        <TableCell>
                          <Chip
                            label={isIncome ? "Доход" : "Расход"}
                            size="small"
                            sx={{
                              height: 21,
                              minWidth: 58,
                              justifyContent: "flex-start",
                              fontSize: 9,
                              color: isIncome ? "#267a35" : "#c62828",
                              bgcolor: isIncome ? "#e8f5e9" : "#ffebee",
                            }}
                          />
                        </TableCell>

                        <TableCell sx={{ fontSize: 10, fontWeight: 600 }}>
                          {operation.category}
                        </TableCell>

                        <TableCell
                          sx={{ fontSize: 10, color: "text.secondary" }}
                        >
                          {operation.comment}
                        </TableCell>

                        <TableCell
                          sx={{
                            fontSize: 10,
                            fontWeight: 700,
                            color: isIncome ? "success.main" : "error.main",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {isIncome ? "+" : "−"}
                          {formatMoney(operation.amount)}
                        </TableCell>

                        <TableCell align="center">
                          <IconButton
                            size="small"
                            onClick={(event) => {
                              setMenuAnchor(event.currentTarget);
                              setMenuOperation(operation);
                            }}
                            aria-label="Действия с операцией"
                          >
                            <MoreHorizRounded fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>

            {filteredOperations.length === 0 && (
              <Stack
                sx={{
                  minHeight: 270,
                  textAlign: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  spacing: 1,
                }}
              >
                <ReceiptLongOutlined
                  sx={{ fontSize: 24, color: "text.secondary" }}
                />
                <Typography sx={{ fontSize: 14, fontWeight: 700 }}>
                  Операций пока нет
                </Typography>
                <Typography sx={{ color: "text.secondary", fontSize: 10 }}>
                  Добавьте первую операцию, чтобы начать вести бюджет
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddRounded />}
                  onClick={openAddDialog}
                  size="small"
                  sx={{ mt: 0.5, fontSize: 10 }}
                >
                  Добавить операцию
                </Button>
              </Stack>
            )}
          </Box>
        </Box>
      </Box>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
      >
        <MenuItem onClick={() => openEditDialog(menuOperation)}>
          Изменить
        </MenuItem>
        <MenuItem onClick={deleteOperation} sx={{ color: "error.main" }}>
          Удалить
        </MenuItem>
      </Menu>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>
          {editingOperation ? "Изменить операцию" : "Добавить операцию"}
        </DialogTitle>

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
          <Button onClick={() => setDialogOpen(false)}>Отмена</Button>
          <Button variant="contained" onClick={saveOperation}>
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
