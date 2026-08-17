// @flowtaris/ui - Main Export
// Design system components and tokens

// Tokens
export * from './tokens'

// Core Components
export { Button, buttonVariants } from './button'
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardAction } from './card'
export { Code, InlineCode } from './code'

// Layout Components
export { Container, Stack, Inline, Grid, Section, Divider, Spacer } from './layout'

// Navigation Components
export { Navbar, Tabs, TabPanel, Breadcrumbs, Pagination } from './navigation'

// Form Components
export { Label, Input, Textarea } from './forms'
export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectSeparator, SelectGroup, SelectScrollUpButton, SelectScrollDownButton } from './select'
export { Checkbox, Radio, RadioGroup, Switch, Field } from './forms'
export { Slider, RangeSlider } from './slider'

// Feedback Components
export { Alert, Progress, Spinner, Skeleton, ToastProvider, useToast, Modal, Tooltip, Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './feedback'

// Overlay Components
export { Portal, Dialog, Drawer, Popover, DropdownMenu } from './overlay'

// Data Display Components
export { Badge, Tag, Avatar, AvatarGroup, Stat, Table, DataList } from './data-display'

// Epic Core Components
export { ParallaxLayers, ParallaxLayer, useParallaxScroll } from './parallax-layers'
export { SplitText, useSplitTextAnimation } from './split-text'
export { ScrollTimeline, TimelineTrack, TimelineTrigger, useScrollTimeline, useScrollAnimation } from './scroll-timeline'
export { FloatingProduct, useFloatingProduct } from './floating-product'
export { ClipPathReveal, ClipPathText } from './clip-path-reveal'
export { IrisWindow, useIrisWindow } from './iris-window'
export { CascadingCardStack } from './cascading-card-stack'

// Theme System
export { ThemeProvider, ThemeToggle, useTheme, useCSSVariables, ThemeScript, getThemeFromHeaders } from './theme'

// Form Validation
export {
  useForm,
  useField,
  Form,
  FormProvider,
  useFormContext,
  ValidationMessage,
  ValidationSummary,
  Validators,
  createFormSchema,
  flattenZodError,
  getFieldError,
  createFieldValidator,
} from './form-validation'

// Patterns
export {
  ScrollReveal,
  StaggeredReveal,
  StickySidebar,
  HeroPattern,
  Header,
  Footer,
  BreadcrumbsPattern,
  CookieBanner,
} from './patterns'

// Utilities
export { cn } from './utils'

// Types - All component prop types
export type { ButtonProps } from './button'
export type { CardProps, CardHeaderProps, CardTitleProps, CardDescriptionProps, CardContentProps, CardFooterProps, CardActionProps } from './card'
export type { CodeProps, InlineCodeProps } from './code'
export type { ContainerProps, StackProps, InlineProps, GridProps, SectionProps, DividerProps, SpacerProps } from './layout'
export type { NavItem, NavbarProps, TabItem, TabsProps, TabPanelProps, BreadcrumbItem, BreadcrumbsProps, PaginationProps } from './navigation'
export type { LabelProps, InputProps, TextareaProps, SelectOption, CheckboxProps, RadioProps, SwitchProps, FieldProps } from './forms'
export type { SelectProps, SelectTriggerProps, SelectValueProps, SelectContentProps, SelectItemProps, SelectGroupProps } from './select'
export type { SliderProps, RangeSliderProps } from './slider'
export type { AlertProps, ProgressProps, SpinnerProps, SkeletonProps, Toast, ToastProviderProps, ModalProps, TooltipProps, AccordionProps, AccordionItemProps, AccordionTriggerProps, AccordionContentProps } from './feedback'
export type { PortalProps, DialogProps, DrawerProps, PopoverProps, DropdownMenuItem, DropdownMenuProps } from './overlay'
export type { BadgeProps, TagProps, AvatarProps, AvatarGroupProps, StatProps, Column, TableProps, DataListItem, DataListProps, SortConfig, FilterConfig, PaginationConfig, VirtualizationConfig } from './data-display'
export type { ParallaxLayerProps, ParallaxLayersProps } from './parallax-layers'
export type { SplitTextProps, SplitTextRef } from './split-text'
export type { ScrollTimelineProps, ScrollTimelineRef, TimelineTrackProps, TimelineTriggerProps } from './scroll-timeline'
export type { FloatingProductProps, FloatingProductRef } from './floating-product'
export type { ClipPathRevealProps, ClipPathTextProps } from './clip-path-reveal'
export type { IrisWindowProps, IrisWindowRef } from './iris-window'
export type { CascadingCardStackProps, CascadingCardData } from './cascading-card-stack'
export type { ThemeMode, ThemeContextValue, ThemeProviderProps, ThemeToggleProps, CSSVariablesOptions } from './theme'
export type {
  ScrollRevealProps,
  StaggeredRevealProps,
  ScrollRevealVariant,
  StickySidebarProps,
  StickySidebarItem,
  HeroPatternProps,
  HeroLayerConfig,
  HeroStatsConfig,
  HeroCTAConfig,
  IrisWindowConfig,
  FloatingProductConfig,
  HeroHeadlineConfig,
  HeroSubheadlineConfig,
  HeroScrollIndicatorConfig,
  HeroVignetteConfig,
  HeroNoiseConfig,
  HeaderProps,
  HeaderNavItem,
  HeaderAction,
  FooterProps,
  FooterColumn,
  FooterLink,
  FooterSocialLink,
  BreadcrumbsPatternProps,
  BreadcrumbPatternItem,
  CookieBannerProps,
  CookiePreferences,
  CookieCategory,
  CookieCategoryConfig,
} from './patterns'

// Form Validation Types
export type {
  FieldState,
  FormState,
  FormFieldProps,
  UseFormOptions,
  FormActions,
  ValidationMessageProps,
  ValidationSummaryProps,
  FormProps,
} from './form-validation'