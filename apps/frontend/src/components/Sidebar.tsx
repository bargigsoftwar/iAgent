import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Button,
  useTheme,
  Drawer,
  useMediaQuery,
  TextField,
  ClickAwayListener,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Chat as ChatIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  Close as CloseIcon,
  Edit as EditIcon,
  Check as CheckIcon,
  Close as CancelIcon,
  Psychology as GeneratingIcon,
} from "@mui/icons-material";
import { type Conversation } from "@iagent/stream-mocks";
import { useTranslation } from "../contexts/TranslationContext";

interface SidebarProps {
  conversations: Conversation[];
  currentConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  onDeleteConversation: (id: string) => void;
  onRenameConversation: (id: string, newTitle: string) => void;
  open: boolean;
  onToggle: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  streamingConversationId?: string | null;
  onWidthChange?: (width: number) => void;
}

// iagent-inspired Sidebar - Clean, minimal navigation

export const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      conversations,
      currentConversationId,
      onSelectConversation,
      onNewConversation,
      onDeleteConversation,
      onRenameConversation,
      open,
      onToggle,
      isDarkMode,
      onToggleTheme,
      streamingConversationId,
      onWidthChange,
    },
    ref
  ) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const { t } = useTranslation();

    // State for editing conversation names
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingTitle, setEditingTitle] = useState<string>("");

    // State for resizable width
    const [sidebarWidth, setSidebarWidth] = useState<number>(() => {
      try {
        const saved = localStorage.getItem("sidebar-width");
        return saved ? parseInt(saved, 10) : 250;
      } catch {
        return 250;
      }
    });
    const [isResizing, setIsResizing] = useState(false);
    const resizeRef = useRef<HTMLDivElement>(null);

    const handleStartEdit = (conversation: Conversation) => {
      setEditingId(conversation.id);
      setEditingTitle(
        conversation.titleKey ? t(conversation.titleKey) : conversation.title
      );
    };

    const handleSaveEdit = () => {
      if (editingId && editingTitle.trim()) {
        onRenameConversation(editingId, editingTitle.trim());
      }
      setEditingId(null);
      setEditingTitle("");
    };

    const handleCancelEdit = () => {
      setEditingId(null);
      setEditingTitle("");
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        handleSaveEdit();
      } else if (e.key === "Escape") {
        handleCancelEdit();
      }
    };

    // Resize functionality
    const handleMouseDown = useCallback((e: React.MouseEvent) => {
      e.preventDefault();
      setIsResizing(true);
    }, []);

    const handleMouseMove = useCallback(
      (e: MouseEvent) => {
        if (!isResizing) return;

        const newWidth = e.clientX;
        const minWidth = 200;
        const maxWidth = 400;

        if (newWidth >= minWidth && newWidth <= maxWidth) {
          setSidebarWidth(newWidth);
          if (onWidthChange) {
            onWidthChange(newWidth);
          }
        }
      },
      [isResizing, onWidthChange]
    );

    const handleMouseUp = useCallback(() => {
      setIsResizing(false);
      // Save to localStorage
      try {
        localStorage.setItem("sidebar-width", sidebarWidth.toString());
      } catch (error) {
        console.warn("Failed to save sidebar width to localStorage:", error);
      }
    }, [sidebarWidth]);

    // Add global mouse event listeners for resize
    useEffect(() => {
      if (isResizing) {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        document.body.style.cursor = "col-resize";
        document.body.style.userSelect = "none";

        return () => {
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
          document.body.style.cursor = "";
          document.body.style.userSelect = "";
        };
      }
      return undefined;
    }, [isResizing, handleMouseMove, handleMouseUp]);

    // Notify parent of width changes
    useEffect(() => {
      if (onWidthChange && open) {
        onWidthChange(sidebarWidth);
      }
    }, [sidebarWidth, onWidthChange, open]);

    // Sidebar Content - Clean, functional design
    const sidebarContent = (
      <Box
        id="iagent-sidebar-content"
        className={`iagent-sidebar-container flex flex-col overflow-hidden relative bg-background-light dark:bg-background-darker ${
          !isDarkMode ? "border-r border-border-light dark:border-border-dark" : ""
        }`}
        sx={{
          width: sidebarWidth,
          height: "100vh",
        }}
      >
        {/* Sidebar Header */}
        <Box
          id="iagent-sidebar-header"
          className="iagent-sidebar-header-section"
          sx={{
            padding: "16px",
            flexShrink: 0,
          }}
        >
          {/* Mobile close button */}
          {isMobile && (
            <IconButton
              id="iagent-sidebar-close"
              className="iagent-mobile-close-button no-rtl-transform absolute right-2 top-2 text-text dark:text-text-darker rounded-md transition-all duration-150 hover:bg-background dark:hover:bg-background-dark hover:text-text-light dark:hover:text-text-lightest"
              onClick={onToggle}
              sx={{
                position: "absolute",
                insetInlineEnd: 8,
                top: 8,
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          )}

          {/* New Chat Button */}
          <Button
            id="iagent-new-chat-button"
            className="iagent-new-conversation-button border-border-light dark:border-border-dark text-text-light dark:text-text-lightest bg-transparent py-2 px-3 rounded-lg text-sm font-medium normal-case transition-all duration-150 shadow-none hover:bg-background dark:hover:bg-background-dark hover:border-border-darker dark:hover:border-border-dark"
            onClick={onNewConversation}
            variant="outlined"
            fullWidth
            sx={{
              padding: "8px 12px",
              boxShadow: "none",
            }}
          >
            <AddIcon sx={{ fontSize: 16, marginInlineEnd: "8px" }} />
            {t("sidebar.newChat")}
          </Button>
        </Box>

        {/* Conversations List */}
        <Box
          id="iagent-conversations-list"
          className="iagent-sidebar-conversations flex-1 overflow-auto px-2 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-border-darker dark:[&::-webkit-scrollbar-thumb]:bg-border-dark [&::-webkit-scrollbar-thumb]:rounded-sm [&::-webkit-scrollbar-thumb:hover]:bg-border-darker dark:[&::-webkit-scrollbar-thumb:hover]:bg-border-dark"
        >
          {conversations.length === 0 ? (
            // Empty State
            <Box
              sx={{
                padding: "24px 16px",
                textAlign: "center",
                animation: "fadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "@keyframes fadeIn": {
                  "0%": { opacity: 0, transform: "translateY(4px)" },
                  "100%": { opacity: 1, transform: "translateY(0)" },
                },
              }}
            >
              <ChatIcon
                className="text-text-darker dark:text-text-DEFAULT opacity-60"
                sx={{
                  fontSize: 24,
                  marginBottom: "8px",
                }}
              />
              <Typography
                variant="body2"
                className="text-sm text-text dark:text-text-darker opacity-80 leading-relaxed"
              >
                {t("sidebar.emptyState")}
              </Typography>
            </Box>
          ) : (
            // Conversation List
            <List sx={{ padding: 0 }}>
              {conversations.map((conversation, index) => (
                <ListItem
                  key={conversation.id}
                  disablePadding
                  sx={{
                    marginBottom: "2px",
                    animation:
                      "conversationSlideIn 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
                    animationDelay: `${index * 0.01}s`,
                    "@keyframes conversationSlideIn": {
                      "0%": { opacity: 0, transform: "translateX(-4px)" },
                      "100%": { opacity: 1, transform: "translateX(0)" },
                    },
                  }}
                >
                  {editingId === conversation.id ? (
                    // Edit Mode
                    <ClickAwayListener onClickAway={handleCancelEdit}>
                      <Box
                        className="flex items-center w-full py-2 px-3 rounded-lg bg-background dark:bg-background-dark gap-2"
                      >
                        <ChatIcon
                          className="text-base text-text dark:text-text-darker flex-shrink-0"
                          sx={{
                            fontSize: 16,
                          }}
                        />

                        <TextField
                          value={editingTitle}
                          onChange={(e) => setEditingTitle(e.target.value)}
                          onKeyDown={handleKeyPress}
                          autoFocus
                          variant="standard"
                          size="small"
                          sx={{
                            flex: 1,
                            "& .MuiInput-root": {
                              fontSize: "14px",
                            },
                            "& .MuiInput-input": {
                              padding: "2px 0",
                            },
                          }}
                        />

                        {/* Save Button */}
                        <IconButton
                          onClick={handleSaveEdit}
                          size="small"
                          className="w-6 h-6 text-success dark:text-success-light hover:bg-background dark:hover:bg-background-dark"
                        >
                          <CheckIcon sx={{ fontSize: 14 }} />
                        </IconButton>

                        {/* Cancel Button */}
                        <IconButton
                          onClick={handleCancelEdit}
                          size="small"
                          className="w-6 h-6 text-text dark:text-text-darker hover:bg-background dark:hover:bg-background-dark hover:text-error dark:hover:text-error-light"
                        >
                          <CancelIcon sx={{ fontSize: 14 }} />
                        </IconButton>
                      </Box>
                    </ClickAwayListener>
                  ) : (
                    // Normal Mode
                    <ListItemButton
                      onClick={() => {
                        onSelectConversation(conversation.id);
                        if (isMobile) onToggle();
                      }}
                      className={`rounded-lg py-2 px-3 min-h-0 transition-all duration-150 ${
                        currentConversationId === conversation.id
                          ? "bg-background dark:bg-background-dark"
                          : "bg-transparent"
                      } hover:bg-background dark:hover:bg-background-dark hover:[&_.action-btns]:opacity-100`}
                      sx={{
                        padding: "8px 12px",
                        minHeight: "auto",
                      }}
                    >
                      {/* Conversation Icon */}
                      {streamingConversationId === conversation.id ? (
                        <GeneratingIcon
                          className="text-base mr-3 flex-shrink-0 text-primary dark:text-primary-light animate-pulse"
                          sx={{
                            fontSize: 16,
                            marginInlineEnd: "12px",
                            animation: "pulse 1.5s ease-in-out infinite",
                            "@keyframes pulse": {
                              "0%": {
                                opacity: 0.6,
                                transform: "scale(1)",
                              },
                              "50%": {
                                opacity: 1,
                                transform: "scale(1.1)",
                              },
                              "100%": {
                                opacity: 0.6,
                                transform: "scale(1)",
                              },
                            },
                          }}
                        />
                      ) : (
                        <ChatIcon
                          className={`text-base mr-3 flex-shrink-0 transition-colors duration-150 ${
                            currentConversationId === conversation.id
                              ? "text-primary dark:text-primary-light"
                              : "text-text dark:text-text-darker"
                          }`}
                          sx={{
                            fontSize: 16,
                            marginInlineEnd: "12px",
                          }}
                        />
                      )}

                      {/* Conversation Title */}
                      <ListItemText
                        primary={
                          conversation.titleKey
                            ? t(conversation.titleKey)
                            : conversation.title
                        }
                        primaryTypographyProps={{
                          noWrap: true,
                          variant: "body2",
                          fontSize: "14px",
                          fontWeight:
                            currentConversationId === conversation.id
                              ? 500
                              : 400,
                          color:
                            currentConversationId === conversation.id
                              ? theme.palette.text.primary
                              : theme.palette.text.secondary,
                        }}
                        sx={{
                          "& .MuiListItemText-primary": {
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            lineHeight: 1.4,
                            transition:
                              "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
                          },
                        }}
                      />

                      {/* Action Buttons */}
                      <Box
                        className="action-btns"
                        sx={{
                          display: "flex",
                          opacity: 0,
                          transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
                          marginInlineStart: "8px",
                          gap: "4px",
                        }}
                      >
                        {/* Edit Button */}
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStartEdit(conversation);
                          }}
                          size="small"
                          className="w-6 h-6 text-text dark:text-text-darker rounded hover:bg-background dark:hover:bg-background-dark hover:text-primary dark:hover:text-primary-light"
                        >
                          <EditIcon sx={{ fontSize: 14 }} />
                        </IconButton>

                        {/* Delete Button */}
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteConversation(conversation.id);
                          }}
                          size="small"
                          className="w-6 h-6 text-text-DEFAULT dark:text-text-darker rounded hover:bg-background-DEFAULT dark:hover:bg-background-dark hover:text-error dark:hover:text-error-light"
                        >
                          <DeleteIcon sx={{ fontSize: 14 }} />
                        </IconButton>
                      </Box>
                    </ListItemButton>
                  )}
                </ListItem>
              ))}
            </List>
          )}
        </Box>

        {/* Sidebar Footer */}
        <Box
          id="iagent-sidebar-footer"
          className="iagent-sidebar-footer-section p-4 border-t border-border-light dark:border-border-dark flex-shrink-0"
        >
          {/* Theme Toggle Button */}
          <Button
            id="iagent-theme-toggle"
            className="iagent-theme-switch-button justify-start py-2 px-3 rounded-lg text-text dark:text-text-darker text-sm font-normal normal-case transition-all duration-300 hover:bg-background dark:hover:bg-background-dark hover:text-text-light dark:hover:text-text-lightest"
            onClick={onToggleTheme}
            variant="text"
            fullWidth
            sx={{
              padding: "8px 12px",
            }}
          >
            {isDarkMode ? (
              <LightModeIcon sx={{ fontSize: 16, marginInlineEnd: "12px" }} />
            ) : (
              <DarkModeIcon sx={{ fontSize: 16, marginInlineEnd: "12px" }} />
            )}
            {isDarkMode ? t("theme.light") : t("theme.dark")}
          </Button>
        </Box>

        {/* Resize Handle */}
        {!isMobile && (
          <Box
            ref={resizeRef}
            onMouseDown={handleMouseDown}
            sx={{
              position: "absolute",
              top: 0,
              insetInlineEnd: 0,
              width: "4px",
              height: "100%",
              cursor: "col-resize",
              backgroundColor: "transparent",
              transition: "background-color 150ms ease",
              zIndex: 10,
              "&:hover": {
                backgroundColor: theme.palette.primary.main,
                opacity: 0.5,
              },
              "&:active": {
                backgroundColor: theme.palette.primary.main,
                opacity: 0.8,
              },
            }}
          />
        )}
      </Box>
    );

    // Mobile Implementation
    if (isMobile) {
      return (
        <Drawer
          anchor="left"
          open={open}
          onClose={onToggle}
          variant="temporary"
          ModalProps={{
            keepMounted: true, // Better mobile performance
          }}
          sx={{
            "& .MuiDrawer-paper": {
              backgroundColor: isDarkMode ? "#171717" : "#f9fafb",
              width: "85%",
              maxWidth: "320px",
              height: "100vh",
              zIndex: 1300,
              boxShadow: isDarkMode
                ? "0 8px 32px rgba(0, 0, 0, 0.5)"
                : "0 8px 32px rgba(0, 0, 0, 0.15)",
              borderInlineEnd: "none",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            },
            "& .MuiBackdrop-root": {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
          }}
        >
          {/* Mobile Sidebar Content with fixed header */}
          <Box
            className="w-full h-screen bg-background-light dark:bg-background-darker flex flex-col overflow-hidden"
          >
            {/* Mobile Header */}
            <Box
              className="p-4 flex-shrink-0 relative border-b border-border-light dark:border-border-dark"
            >
              {/* Mobile close button - Fixed positioning */}
              <IconButton
                onClick={onToggle}
                className="absolute right-3 top-3 text-text dark:text-text-darker bg-background-lightest dark:bg-background-dark rounded-lg w-9 h-9 z-10 shadow-md transition-all duration-150 hover:bg-background dark:hover:bg-background-dark hover:text-text-light dark:hover:text-text-lightest hover:scale-105 active:scale-95"
                sx={{
                  position: "absolute",
                  insetInlineEnd: 12,
                  top: 12,
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>

              {/* New Chat Button */}
              <Button
                onClick={onNewConversation}
                variant="outlined"
                fullWidth
                className="border-border-light dark:border-border-dark text-text-light dark:text-text-lightest bg-transparent py-2 px-3 rounded-lg text-sm font-medium normal-case transition-all duration-150 shadow-none mt-2 hover:bg-background dark:hover:bg-background-dark hover:border-border-darker dark:hover:border-border-dark"
                sx={{
                  padding: "8px 12px",
                  marginTop: "8px",
                  boxShadow: "none",
                }}
              >
                <AddIcon sx={{ fontSize: 16, marginInlineEnd: "8px" }} />
                {t("sidebar.newChat")}
              </Button>
            </Box>

            {/* Conversations List */}
            <Box
              className="flex-1 overflow-auto p-2 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-border-darker dark:[&::-webkit-scrollbar-thumb]:bg-border-dark [&::-webkit-scrollbar-thumb]:rounded-sm [&::-webkit-scrollbar-thumb:hover]:bg-border-darker dark:[&::-webkit-scrollbar-thumb:hover]:bg-border-dark"
            >
              {conversations.length === 0 ? (
                <Box
                  className="py-6 px-4 text-center"
                >
                  <ChatIcon
                    className="text-text-tertiary-light dark:text-text-tertiary-dark opacity-60 mb-2"
                    sx={{
                      fontSize: 24,
                      marginBottom: "8px",
                    }}
                  />
                  <Typography
                    variant="body2"
                    className="text-sm text-text dark:text-text-darker opacity-80 leading-relaxed"
                  >
                    {t("sidebar.emptyState")}
                  </Typography>
                </Box>
              ) : (
                <List sx={{ padding: 0 }}>
                  {conversations.map((conversation) => (
                    <ListItem
                      key={conversation.id}
                      disablePadding
                      sx={{ marginBottom: "2px" }}
                    >
                      <ListItemButton
                        onClick={() => {
                          onSelectConversation(conversation.id);
                          onToggle(); // Close sidebar on mobile after selection
                        }}
                        className={`rounded-lg p-3 min-h-0 ${
                          currentConversationId === conversation.id
                            ? "bg-background dark:bg-background-dark"
                            : "bg-transparent"
                        } hover:bg-background dark:hover:bg-background-dark`}
                        sx={{
                          padding: "12px",
                          minHeight: "auto",
                        }}
                      >
                        <ChatIcon
                          className={`text-base mr-3 flex-shrink-0 ${
                            currentConversationId === conversation.id
                              ? "text-primary dark:text-primary-light"
                              : "text-text dark:text-text-darker"
                          }`}
                          sx={{
                            fontSize: 16,
                            marginInlineEnd: "12px",
                          }}
                        />

                        <ListItemText
                          primary={
                            conversation.titleKey
                              ? t(conversation.titleKey)
                              : conversation.title
                          }
                          primaryTypographyProps={{
                            noWrap: true,
                            variant: "body2",
                            fontSize: "14px",
                            fontWeight:
                              currentConversationId === conversation.id
                                ? 500
                                : 400,
                            color:
                              currentConversationId === conversation.id
                                ? theme.palette.text.primary
                                : theme.palette.text.secondary,
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>

            {/* Mobile Footer */}
            <Box
              sx={{
                padding: "16px",
                borderTop: `1px solid ${theme.palette.divider}`,
                flexShrink: 0,
                paddingBottom: "max(16px, env(safe-area-inset-bottom))",
              }}
            >
              <Button
                onClick={onToggleTheme}
                variant="text"
                fullWidth
                sx={{
                  justifyContent: "flex-start",
                  padding: "12px",
                  borderRadius: "8px",
                  color: theme.palette.text.secondary,
                  fontSize: "14px",
                  fontWeight: 400,
                  textTransform: "none",
                  transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                    color: theme.palette.text.primary,
                  },
                }}
              >
                {isDarkMode ? (
                  <LightModeIcon
                    sx={{ fontSize: 16, marginInlineEnd: "12px" }}
                  />
                ) : (
                  <DarkModeIcon
                    sx={{ fontSize: 16, marginInlineEnd: "12px" }}
                  />
                )}
                {isDarkMode ? t("theme.light") : t("theme.dark")}
              </Button>
            </Box>
          </Box>
        </Drawer>
      );
    }

    // Desktop Implementation
    return (
      <Box
        id="iagent-sidebar"
        className="iagent-sidebar-wrapper"
        ref={ref}
        sx={{
          width: open ? sidebarWidth : 0,
          flexShrink: 0,
          overflow: "hidden",
          transition: isResizing
            ? "none"
            : "width 300ms cubic-bezier(0.4, 0, 0.2, 1)",
          height: "100vh",
        }}
      >
        {sidebarContent}
      </Box>
    );
  }
);
