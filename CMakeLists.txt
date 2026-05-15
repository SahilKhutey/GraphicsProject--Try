cmake_minimum_required(VERSION 3.20)
project(AethelgardEngine VERSION 0.1.0)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Optimization flags for simulation
if(MSVC)
    add_compile_options(/W4 /Ox /Zi)
else()
    add_compile_options(-Wall -Wextra -O3 -g)
endif()

# Define Engine Hierarchical Paths
set(ENGINE_DIR ${CMAKE_CURRENT_SOURCE_DIR}/Engine)
set(INCLUDE_DIR ${ENGINE_DIR})
set(SRC_DIR ${CMAKE_CURRENT_SOURCE_DIR}/src)

# Find Packages
find_package(OpenGL REQUIRED)

# Source Discovery (Hierarchical)
file(GLOB_RECURSE SOURCES 
    "${ENGINE_DIR}/**/*.cpp"
    "${ENGINE_DIR}/**/*.hpp"
    "${SRC_DIR}/*.cpp"
)

add_executable(${PROJECT_NAME} ${SOURCES})

target_include_directories(${PROJECT_NAME} PUBLIC 
    ${ENGINE_DIR}
    # Future: ${CMAKE_CURRENT_SOURCE_DIR}/thirdparty/include
)

target_link_libraries(${PROJECT_NAME} 
    OpenGL::GL
    # glfw, glad, glm (Assuming provided via system or vcpkg)
)

# Asset and Shader deployment
add_custom_command(TARGET ${PROJECT_NAME} POST_BUILD
    COMMAND ${CMAKE_COMMAND} -E copy_directory
    ${CMAKE_CURRENT_SOURCE_DIR}/shaders $<TARGET_FILE_DIR:${PROJECT_NAME}>/shaders
)
