#!/bin/bash
# ============================================
# LMS SEKOLAH - SUPABASE AUTO DEPLOY SCRIPT
# ============================================
# Usage: ./deploy-database.sh
# Requirements: curl, jq (optional)

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ============================================
# CONFIGURATION
# ============================================
SUPABASE_URL="https://xlzpspzdlywwbxzzzlyfv.supabase.co"
SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsenBzcHpkbHl3d2J4enpseWZ2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDY3OTA2MSwiZXhwIjoyMDkwMjU1MDYxfQ.muzbSSNvRCF01Y1mpIiKBkv9U8qTaLyZHjASf8Zho0w"

# SQL Files
SCHEMA_FILE="database/schema.sql"
RLS_FILE="database/rls_policies.sql"
SEED_FILE="database/seed.sql"

# ============================================
# FUNCTIONS
# ============================================

print_header() {
    echo -e "${BLUE}"
    echo "=========================================="
    echo "  LMS SEKOLAH - DATABASE DEPLOYMENT"
    echo "=========================================="
    echo -e "${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}→ $1${NC}"
}

check_dependencies() {
    print_info "Checking dependencies..."
    
    if ! command -v curl &> /dev/null; then
        print_error "curl is not installed. Please install curl first."
        exit 1
    fi
    
    print_success "curl is installed"
}

check_files() {
    print_info "Checking SQL files..."
    
    for file in "$SCHEMA_FILE" "$RLS_FILE" "$SEED_FILE"; do
        if [ ! -f "$file" ]; then
            print_error "File not found: $file"
            exit 1
        fi
        print_success "Found: $file"
    done
}

execute_sql() {
    local file=$1
    local description=$2
    
    print_info "Executing: $description..."
    
    # Read SQL file
    local sql_content
    sql_content=$(cat "$file")
    
    # Execute via Supabase REST API
    local response
    response=$(curl -s -X POST "${SUPABASE_URL}/rest/v1/" \
        -H "apikey: ${SERVICE_ROLE_KEY}" \
        -H "Authorization: Bearer ${SERVICE_ROLE_KEY}" \
        -H "Content-Type: application/json" \
        -d "{\"query\": $(echo "$sql_content" | jq -Rs .)}" 2>&1 || true)
    
    if [ $? -eq 0 ]; then
        print_success "$description completed"
        return 0
    else
        print_error "$description failed"
        echo "$response"
        return 1
    fi
}

# Alternative: Use psql if available
execute_sql_psql() {
    local file=$1
    local description=$2
    
    print_info "Executing: $description (via psql)..."
    
    # Extract connection info from Supabase URL
    # Format: https://project-ref.supabase.co
    local project_ref="${SUPABASE_URL#https://}"
    project_ref="${project_ref%.supabase.co}"
    
    # Supabase direct connection string
    local db_url="postgresql://postgres:${SERVICE_ROLE_KEY}@db.${project_ref}.supabase.co:5432/postgres"
    
    if PGPASSWORD="${SERVICE_ROLE_KEY}" psql "${db_url}" -f "$file" 2>/dev/null; then
        print_success "$description completed"
        return 0
    else
        print_error "$description failed or psql not available"
        return 1
    fi
}

# Manual SQL execution instructions
print_manual_instructions() {
    echo ""
    echo -e "${YELLOW}=========================================="
    echo "  MANUAL DEPLOYMENT INSTRUCTIONS"
    echo "==========================================${NC}"
    echo ""
    echo "Since auto-deployment requires direct database access,"
    echo "please follow these steps:"
    echo ""
    echo -e "${BLUE}1. Open Supabase SQL Editor:${NC}"
    echo "   https://xlzpspzdlywwbxzzzlyfv.supabase.co/project/sql"
    echo ""
    echo -e "${BLUE}2. Run these SQL files in order:${NC}"
    echo ""
    echo -e "   ${GREEN}a) schema.sql${NC} - Creates all tables"
    echo "      File: database/schema.sql"
    echo ""
    echo -e "   ${GREEN}b) rls_policies.sql${NC} - Sets up security policies"
    echo "      File: database/rls_policies.sql"
    echo ""
    echo -e "   ${GREEN}c) seed.sql${NC} - Inserts sample data"
    echo "      File: database/seed.sql"
    echo ""
    echo -e "${BLUE}3. Alternative: Use Supabase CLI${NC}"
    echo "   npm install -g supabase"
    echo "   supabase login"
    echo "   supabase db push"
    echo ""
}

# Create a combined SQL file for easier deployment
create_combined_sql() {
    local output_file="database/combined_deploy.sql"
    
    print_info "Creating combined SQL file..."
    
    cat > "$output_file" << 'EOF'
-- ============================================
-- LMS SEKOLAH - COMPLETE DATABASE DEPLOYMENT
-- ============================================
-- This file combines schema, RLS policies, and seed data
-- Run this in Supabase SQL Editor

-- ============================================
-- PART 1: SCHEMA
-- ============================================

EOF

    cat "$SCHEMA_FILE" >> "$output_file"
    
    cat >> "$output_file" << 'EOF'

-- ============================================
-- PART 2: RLS POLICIES
-- ============================================

EOF

    cat "$RLS_FILE" >> "$output_file"
    
    cat >> "$output_file" << 'EOF'

-- ============================================
-- PART 3: SEED DATA
-- ============================================

EOF

    cat "$SEED_FILE" >> "$output_file"
    
    print_success "Created: $output_file"
    echo ""
    echo -e "${YELLOW}You can now copy-paste the entire contents of:${NC}"
    echo "  $output_file"
    echo ""
    echo "Into the Supabase SQL Editor at:"
    echo "  https://xlzpspzdlywwbxzzzlyfv.supabase.co/project/sql"
}

# ============================================
# MAIN EXECUTION
# ============================================

main() {
    print_header
    
    # Check if running from correct directory
    if [ ! -f "package.json" ]; then
        print_error "Please run this script from the project root directory"
        exit 1
    fi
    
    check_dependencies
    check_files
    
    echo ""
    print_info "Supabase Project: ${SUPABASE_URL}"
    echo ""
    
    # Create combined SQL file for easy deployment
    create_combined_sql
    
    # Print instructions
    print_manual_instructions
    
    echo -e "${GREEN}=========================================="
    echo "  DEPLOYMENT PREPARATION COMPLETE"
    echo "==========================================${NC}"
    echo ""
}

# Run main function
main
