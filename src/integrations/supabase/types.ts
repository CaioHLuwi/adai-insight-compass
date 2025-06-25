export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      achievements: {
        Row: {
          created_at: string | null
          date_achieved: string
          description: string | null
          id: string
          name: string
          type: string
          user_id: string | null
          value: number | null
        }
        Insert: {
          created_at?: string | null
          date_achieved: string
          description?: string | null
          id?: string
          name: string
          type: string
          user_id?: string | null
          value?: number | null
        }
        Update: {
          created_at?: string | null
          date_achieved?: string
          description?: string | null
          id?: string
          name?: string
          type?: string
          user_id?: string | null
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "achievements_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      campaign_metrics: {
        Row: {
          approval_rate: number | null
          arpu: number | null
          campaign_id: string | null
          chargeback: number | null
          chargeback_sales: number | null
          cpa: number | null
          cpc: number | null
          created_at: string | null
          ctr: number | null
          daily_sales: number | null
          date: string
          gross_revenue: number | null
          id: string
          net_revenue: number | null
          paid_sales: number | null
          pending_sales: number | null
          product_costs: number | null
          product_revenue: number | null
          product_sales: number | null
          profit: number | null
          profit_margin: number | null
          rate: number | null
          refund_rate: number | null
          refunded_sales: number | null
          returned_sales: number | null
          roas: number | null
          roi: number | null
          spend: number | null
          tax: number | null
        }
        Insert: {
          approval_rate?: number | null
          arpu?: number | null
          campaign_id?: string | null
          chargeback?: number | null
          chargeback_sales?: number | null
          cpa?: number | null
          cpc?: number | null
          created_at?: string | null
          ctr?: number | null
          daily_sales?: number | null
          date: string
          gross_revenue?: number | null
          id?: string
          net_revenue?: number | null
          paid_sales?: number | null
          pending_sales?: number | null
          product_costs?: number | null
          product_revenue?: number | null
          product_sales?: number | null
          profit?: number | null
          profit_margin?: number | null
          rate?: number | null
          refund_rate?: number | null
          refunded_sales?: number | null
          returned_sales?: number | null
          roas?: number | null
          roi?: number | null
          spend?: number | null
          tax?: number | null
        }
        Update: {
          approval_rate?: number | null
          arpu?: number | null
          campaign_id?: string | null
          chargeback?: number | null
          chargeback_sales?: number | null
          cpa?: number | null
          cpc?: number | null
          created_at?: string | null
          ctr?: number | null
          daily_sales?: number | null
          date?: string
          gross_revenue?: number | null
          id?: string
          net_revenue?: number | null
          paid_sales?: number | null
          pending_sales?: number | null
          product_costs?: number | null
          product_revenue?: number | null
          product_sales?: number | null
          profit?: number | null
          profit_margin?: number | null
          rate?: number | null
          refund_rate?: number | null
          refunded_sales?: number | null
          returned_sales?: number | null
          roas?: number | null
          roi?: number | null
          spend?: number | null
          tax?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_metrics_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      campaigns: {
        Row: {
          campaign_id: string
          created_at: string | null
          daily_budget: number | null
          google_ads_account_id: string | null
          id: string
          meta_ads_account_id: string | null
          name: string
          platform: string
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          campaign_id: string
          created_at?: string | null
          daily_budget?: number | null
          google_ads_account_id?: string | null
          id?: string
          meta_ads_account_id?: string | null
          name: string
          platform: string
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          campaign_id?: string
          created_at?: string | null
          daily_budget?: number | null
          google_ads_account_id?: string | null
          id?: string
          meta_ads_account_id?: string | null
          name?: string
          platform?: string
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_google_ads_account_id_fkey"
            columns: ["google_ads_account_id"]
            isOneToOne: false
            referencedRelation: "google_ads_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaigns_meta_ads_account_id_fkey"
            columns: ["meta_ads_account_id"]
            isOneToOne: false
            referencedRelation: "meta_ads_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaigns_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      expenses: {
        Row: {
          amount: number
          category: string
          created_at: string | null
          date: string
          description: string | null
          id: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          amount: number
          category: string
          created_at?: string | null
          date: string
          description?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          category?: string
          created_at?: string | null
          date?: string
          description?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "expenses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      google_ads_accounts: {
        Row: {
          created_at: string | null
          customer_id: string
          id: string
          name: string
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          customer_id: string
          id?: string
          name: string
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          customer_id?: string
          id?: string
          name?: string
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "google_ads_accounts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      google_ads_subaccounts: {
        Row: {
          created_at: string | null
          customer_id: string
          id: string
          name: string
          parent_account_id: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          customer_id: string
          id?: string
          name: string
          parent_account_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          customer_id?: string
          id?: string
          name?: string
          parent_account_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "google_ads_subaccounts_parent_account_id_fkey"
            columns: ["parent_account_id"]
            isOneToOne: false
            referencedRelation: "google_ads_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      meta_ads_accounts: {
        Row: {
          account_id: string
          created_at: string | null
          id: string
          name: string
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          account_id: string
          created_at?: string | null
          id?: string
          name: string
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          account_id?: string
          created_at?: string | null
          id?: string
          name?: string
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "meta_ads_accounts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      meta_ads_subaccounts: {
        Row: {
          account_id: string
          created_at: string | null
          id: string
          name: string
          parent_account_id: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          account_id: string
          created_at?: string | null
          id?: string
          name: string
          parent_account_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          account_id?: string
          created_at?: string | null
          id?: string
          name?: string
          parent_account_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "meta_ads_subaccounts_parent_account_id_fkey"
            columns: ["parent_account_id"]
            isOneToOne: false
            referencedRelation: "meta_ads_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          message: string
          read: boolean | null
          title: string
          type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: string
          read?: boolean | null
          title: string
          type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string
          read?: boolean | null
          title?: string
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          cost: number
          created_at: string | null
          description: string | null
          id: string
          name: string
          price: number
          sku: string | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          cost: number
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          price: number
          sku?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          cost?: number
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          price?: number
          sku?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      rates: {
        Row: {
          created_at: string | null
          id: string
          is_percentage: boolean | null
          name: string
          type: string
          updated_at: string | null
          user_id: string | null
          value: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_percentage?: boolean | null
          name: string
          type: string
          updated_at?: string | null
          user_id?: string | null
          value: number
        }
        Update: {
          created_at?: string | null
          id?: string
          is_percentage?: boolean | null
          name?: string
          type?: string
          updated_at?: string | null
          user_id?: string | null
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "rates_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      reports: {
        Row: {
          created_at: string | null
          filters: Json | null
          id: string
          name: string
          type: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          filters?: Json | null
          id?: string
          name: string
          type: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          filters?: Json | null
          id?: string
          name?: string
          type?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reports_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_settings: {
        Row: {
          created_at: string | null
          email_notifications: boolean | null
          id: string
          language: string | null
          notifications_enabled: boolean | null
          theme: string | null
          timezone: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          email_notifications?: boolean | null
          id?: string
          language?: string | null
          notifications_enabled?: boolean | null
          theme?: string | null
          timezone?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          email_notifications?: boolean | null
          id?: string
          language?: string | null
          notifications_enabled?: boolean | null
          theme?: string | null
          timezone?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_settings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          name: string
          password_hash: string
          role: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          name: string
          password_hash: string
          role: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          password_hash?: string
          role?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_campaign_summary: {
        Args: {
          p_campaign_id: string
          p_start_date?: string
          p_end_date?: string
        }
        Returns: {
          total_spend: number
          total_revenue: number
          total_profit: number
          avg_ctr: number
          avg_cpa: number
          avg_cpc: number
          avg_roas: number
          avg_roi: number
          total_sales: number
          days_count: number
        }[]
      }
      get_dashboard_metrics: {
        Args: { p_user_id: string; p_start_date?: string; p_end_date?: string }
        Returns: {
          total_campaigns: number
          active_campaigns: number
          total_spend: number
          total_revenue: number
          total_profit: number
          avg_roas: number
          total_expenses: number
        }[]
      }
      get_temporal_chart_data: {
        Args: {
          p_user_id: string
          p_metric?: string
          p_start_date?: string
          p_end_date?: string
        }
        Returns: {
          date: string
          value: number
        }[]
      }
      get_top_campaigns_by_performance: {
        Args: {
          p_user_id: string
          p_metric?: string
          p_limit?: number
          p_start_date?: string
          p_end_date?: string
        }
        Returns: {
          campaign_id: string
          campaign_name: string
          platform: string
          metric_value: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
