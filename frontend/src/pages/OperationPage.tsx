import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Chip,
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
  Typography,
} from "@mui/material";

import {
  AddRounded,
  MoreHorizRounded,
  ReceiptLongOutlined,
} from "@mui/icons-material";
import { formatDateFromString, formatMoney } from "../shared";
import type { IOperation } from "../shared/types";
import { AddButton } from "../shared/components";
import { useOperations, useOperationsActions } from "../store";
import { deleteTransaction } from "../services/server.service";
import { AddOperation } from "../widgets/AddOperation";
import { UpdateOperation } from "../widgets/UpdateOperation";

export function OperationsPage() {
  const operations = useOperations();
  const { deleteOperation } = useOperationsActions();

  const [period, setPeriod] = useState("2026-11");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingOperation, setEditingOperation] = useState<IOperation | null>(
    null,
  );

  const [menuAnchor, setMenuAnchor] = useState<HTMLButtonElement | null>(null);
  const [menuOperation, setMenuOperation] = useState<IOperation | null>(null);

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

  const openAddDialog = () => {
    setEditingOperation(null);
    setDialogOpen(true);
  };

  const openEditDialog = () => {
    if (!menuOperation) return;
    setEditingOperation(menuOperation);
    setMenuAnchor(null);
  };

  const handleDeleteOperation = async () => {
    if (!menuOperation) return;

    const response = await deleteTransaction(menuOperation.id);

    if (response.status > 300) {
      return;
    }
    deleteOperation(menuOperation.id);
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
                <Typography
                  sx={{ color: "text.secondary", fontSize: 10, mb: 1 }}
                >
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
                          {formatDateFromString(operation.date)}
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
                <AddButton handleClick={openAddDialog} />
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
        <MenuItem onClick={openEditDialog}>Изменить</MenuItem>
        <MenuItem onClick={handleDeleteOperation} sx={{ color: "error.main" }}>
          Удалить
        </MenuItem>
      </Menu>

      <AddOperation
        openModal={dialogOpen}
        handleClose={() => setDialogOpen(false)}
      />

      <AddOperation
        openModal={dialogOpen}
        handleClose={() => setDialogOpen(false)}
      />
      {!!editingOperation && (
        <UpdateOperation
          operation={editingOperation}
          handleClose={() => setEditingOperation(null)}
        />
      )}
    </>
  );
}
